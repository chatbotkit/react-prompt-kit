import type { ReactElement, ReactNode } from 'react'

/**
 * Type representing valid JSX children
 */
type JSXChild = ReactNode

/**
 * Block-level elements that should be separated by blank lines
 */
const blockLevelTags = new Set([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'ul',
  'ol',
  'blockquote',
  'pre',
  'hr',
])

/**
 * List item elements that should be separated by single newlines
 */
const listItemTags = new Set(['li'])

/**
 * Strip XML tags from a string
 */
function stripXMLTags(text: string): string {
  return text.replace(/<[^>]+>/g, '')
}

/**
 * Normalize whitespace by replacing newlines with spaces and collapsing
 * multiple spaces
 */
function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

/**
 * Prepare text for inline contexts like headings by stripping XML and
 * normalizing whitespace
 */
function prepareInlineText(text: string): string {
  return collapseWhitespace(stripXMLTags(text))
}

/**
 * Mapping of standard HTML tags to Markdown conversion functions
 */
const tagToMarkdown: Record<
  string,
  (children: string, props?: Record<string, unknown>) => string
> = {
  // headings

  h1: (children) => `# ${prepareInlineText(children)}`,
  h2: (children) => `## ${prepareInlineText(children)}`,
  h3: (children) => `### ${prepareInlineText(children)}`,
  h4: (children) => `#### ${prepareInlineText(children)}`,
  h5: (children) => `##### ${prepareInlineText(children)}`,
  h6: (children) => `###### ${prepareInlineText(children)}`,

  // paragraph

  p: (children) => children,

  // text formatting

  strong: (children) => `**${prepareInlineText(children)}**`,
  b: (children) => `**${prepareInlineText(children)}**`,
  em: (children) => `_${prepareInlineText(children)}_`,
  i: (children) => `_${prepareInlineText(children)}_`,
  code: (children) => `\`${prepareInlineText(children)}\``,
  del: (children) => `~~${prepareInlineText(children)}~~`,
  s: (children) => `~~${prepareInlineText(children)}~~`,

  // links

  a: (children, props) => {
    const href = props?.href as string | undefined
    const text = prepareInlineText(children)

    return href ? `[${text}](${prepareInlineText(href)})` : `[${text}]()`
  },

  // lists

  ul: (children) => children,
  ol: (children) => children,
  li: (children) => `- ${children}`,

  // blockquote

  blockquote: (children) =>
    children
      .split('\n')
      .map((line) => `> ${line}`)
      .join('\n'),

  // horizontal rule

  hr: () => '---',

  // line break

  br: () => '\n',

  // preformatted

  pre: (children, props) => {
    const language = (props?.language || props?.['data-language']) as
      | string
      | undefined

    return language
      ? `\`\`\`${language}\n${children}\n\`\`\``
      : `\`\`\`\n${children}\n\`\`\``
  },
}

/**
 * Check if a tag is a standard HTML element that should be converted to Markdown
 */
function isStandardHTMLTag(tag: string): boolean {
  return tag in tagToMarkdown
}

/**
 * Serialize a custom element back to JSX-like string
 */
function serializeCustomElement(
  tag: string,
  props: Record<string, unknown> | null,
  children: string
): string {
  const propsStr = props
    ? Object.entries(props)
        .filter(([key]) => key !== 'children')
        .map(([key, value]) => {
          if (typeof value === 'string') {
            return `${key}="${value}"`
          } else if (typeof value === 'boolean') {
            return value ? key : ''
          } else if (value != null) {
            return `${key}={${JSON.stringify(value)}}`
          }

          return ''
        })
        .filter(Boolean)
        .join(' ')
    : ''

  const openTag = propsStr ? `<${tag} ${propsStr}>` : `<${tag}>`

  if (children) {
    return `${openTag}\n${children}\n</${tag}>`
  }

  return `<${tag} />`
}

/**
 * Check if an element is a block-level element
 */
function isBlockLevelElement(child: JSXChild): boolean {
  if (
    child &&
    typeof child === 'object' &&
    'type' in child &&
    typeof child.type === 'string'
  ) {
    const tag = child.type.toLowerCase()

    // @note custom elements (non-standard HTML) are treated as block-level for proper spacing

    return blockLevelTags.has(tag) || !isStandardHTMLTag(tag)
  }

  return false
}

/**
 * Check if an element is a list item element
 */
function isListItemElement(child: JSXChild): boolean {
  if (
    child &&
    typeof child === 'object' &&
    'type' in child &&
    typeof child.type === 'string'
  ) {
    return listItemTags.has(child.type.toLowerCase())
  }

  return false
}

/**
 * Convert JSX children to Markdown string
 */
function convertChildren(children: JSXChild): string {
  if (children == null || typeof children === 'boolean') {
    return ''
  }

  if (typeof children === 'string' || typeof children === 'number') {
    return String(children)
  }

  if (Array.isArray(children)) {
    // @note flatten nested arrays and fragments first

    const flattenedChildren: JSXChild[] = []

    for (const child of children) {
      if (Array.isArray(child)) {
        flattenedChildren.push(...child)
      } else if (
        child &&
        typeof child === 'object' &&
        'type' in child &&
        'props' in child &&
        (typeof child.type === 'symbol' ||
          (typeof child.type === 'string' && child.type === 'fragment'))
      ) {
        // @note flatten fragment children directly

        const fragmentChildren = (child as ReactElement).props.children

        if (Array.isArray(fragmentChildren)) {
          flattenedChildren.push(...fragmentChildren)
        } else {
          flattenedChildren.push(fragmentChildren)
        }
      } else {
        flattenedChildren.push(child)
      }
    }

    const parts: string[] = []

    let previousWasBlock = false
    let previousWasListItem = false

    for (const child of flattenedChildren) {
      const isBlock = isBlockLevelElement(child)
      const isListItem = isListItemElement(child)

      const converted = convertChildren(child)

      if (converted) {
        // @note add blank line between consecutive block-level elements
        if (previousWasBlock && isBlock && parts.length > 0) {
          parts.push('\n\n')
        }
        // @note add single newline between consecutive list items
        else if (previousWasListItem && isListItem && parts.length > 0) {
          parts.push('\n')
        }

        parts.push(converted)

        previousWasBlock = isBlock
        previousWasListItem = isListItem
      }
    }

    return parts.join('')
  }

  // handle React elements

  if (
    typeof children === 'object' &&
    'type' in children &&
    'props' in children
  ) {
    return convertElement(children as ReactElement)
  }

  return ''
}

/**
 * Convert a single React element to Markdown
 */
function convertElement(element: ReactElement): string {
  const { type, props } = element

  // handle fragments
  // @note fragments should pass their children as an array for proper spacing

  if (
    typeof type === 'symbol' ||
    (typeof type === 'string' && type === 'fragment')
  ) {
    // @note ensure children is treated as an array for proper block-level spacing

    const children = props.children

    if (Array.isArray(children)) {
      return convertChildren(children)
    }

    return convertChildren(children)
  }

  // handle string types (HTML elements)

  if (typeof type === 'string') {
    const tag = type.toLowerCase()
    const children = convertChildren(props.children)

    if (isStandardHTMLTag(tag)) {
      // convert standard HTML to Markdown

      const converter = tagToMarkdown[tag]

      return converter(children, props)
    }

    // preserve custom elements as JSX-like syntax

    return serializeCustomElement(tag, props, children)
  }

  // handle function/class components - render them and convert the result

  if (typeof type === 'function') {
    // @note call the function component to get its JSX output
    // @note for class components, we would need to instantiate them, but we only use function components
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rendered = (type as (props: any) => ReactElement)(props)

    return convertElement(rendered)
  }

  return ''
}

/**
 * Convert JSX/React elements to Markdown
 *
 * @param jsx - React element(s) to convert
 * @returns Markdown string representation
 */
export function prompt(jsx: ReactElement | ReactElement[]): string {
  if (Array.isArray(jsx)) {
    return jsx.map((element) => convertElement(element)).join('\n\n')
  }

  return convertElement(jsx)
}

/**
 * Default export for convenience
 */
export default prompt

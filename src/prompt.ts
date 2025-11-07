import type { ReactElement, ReactNode } from 'react'

/**
 * Type representing valid JSX children
 */
type JSXChild = ReactNode

/**
 * Inline-level HTML elements that should not be separated by blank lines.
 * All other tags (including custom XML tags) will be treated as block-level.
 */
const inlineTags = new Set([
  'strong',
  'b',
  'em',
  'i',
  'code',
  'del',
  's',
  'a',
  'span',
])

/**
 * List item elements that should be separated by single newlines
 */
const listItemTags = new Set(['li'])

/**
 * Internal representation of rendered elements with spacing metadata
 */
type ConvertedPart = {
  content: string
  isBlock: boolean
  isListItem: boolean
  isWhitespace: boolean
}

/**
 * Combine converted parts while preserving appropriate spacing semantics
 */
function joinParts(parts: ConvertedPart[]): string {
  const output: string[] = []

  let previousWasBlock = false
  let previousWasListItem = false
  let pendingWhitespace: string | null = null

  for (const part of parts) {
    if (part.isWhitespace) {
      if (output.length > 0) {
        pendingWhitespace = part.content
      }

      continue
    }

    if (output.length > 0) {
      if (previousWasBlock && part.isBlock) {
        output.push('\n\n')
        pendingWhitespace = null
      } else if (previousWasListItem && part.isListItem) {
        output.push('\n')
        pendingWhitespace = null
      } else if (pendingWhitespace) {
        if (
          !previousWasBlock &&
          !part.isBlock &&
          !previousWasListItem &&
          !part.isListItem
        ) {
          if (pendingWhitespace.includes('\n')) {
            const newlineCount = pendingWhitespace.split('\n').length - 1

            output.push(newlineCount > 1 ? '\n\n' : '\n')
          } else {
            output.push(' ')
          }
        }

        pendingWhitespace = null
      }
    }

    if (!part.content) {
      continue
    }

    output.push(part.content)

    previousWasBlock = part.isBlock
    previousWasListItem = part.isListItem
  }

  return output.join('')
}

/**
 * Convert arbitrary JSX children into normalized converted parts
 */
function collectConvertedParts(children: JSXChild): ConvertedPart[] {
  if (children == null || typeof children === 'boolean') {
    return []
  }

  if (typeof children === 'string' || typeof children === 'number') {
    const content = String(children)

    if (content.trim().length === 0) {
      return [
        {
          content,
          isBlock: false,
          isListItem: false,
          isWhitespace: true,
        },
      ]
    }

    return [
      {
        content,
        isBlock: false,
        isListItem: false,
        isWhitespace: false,
      },
    ]
  }

  if (Array.isArray(children)) {
    const parts: ConvertedPart[] = []

    for (const child of children) {
      parts.push(...collectConvertedParts(child))
    }

    return parts
  }

  if (
    typeof children === 'object' &&
    'type' in children &&
    'props' in children
  ) {
    return convertElementToParts(children as ReactElement)
  }

  return []
}

/**
 * Convert a single React element into converted parts for spacing decisions
 *
 * @param element - React element to convert
 * @returns converted parts with spacing metadata
 */
function convertElementToParts(element: ReactElement): ConvertedPart[] {
  const { type, props } = element

  if (
    typeof type === 'symbol' ||
    (typeof type === 'string' && type === 'fragment')
  ) {
    return collectConvertedParts(props.children)
  }

  if (typeof type === 'string') {
    const tag = type.toLowerCase()
    const childrenContent = convertChildren(props.children)
    const isListItem = listItemTags.has(tag)
    const isBlock = isListItem ? false : !inlineTags.has(tag)

    if (tag in tagToMarkdown) {
      const converter = tagToMarkdown[tag]

      return [
        {
          content: converter(childrenContent, props),
          isBlock,
          isListItem,
          isWhitespace: false,
        },
      ]
    }

    return [
      {
        content: serializeCustomElement(tag, props, childrenContent),
        isBlock,
        isListItem,
        isWhitespace: false,
      },
    ]
  }

  if (typeof type === 'function') {
    // @note render function components to inspect their structure for spacing decisions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rendered = (type as (props: any) => ReactElement)(props)

    return collectConvertedParts(rendered)
  }

  return []
}

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
 * Prepare text for inline code - keep content as-is but collapse whitespace
 */
function prepareInlineCode(text: string): string {
  return collapseWhitespace(text)
}

/**
 * Find the longest sequence of backticks in a string and return a fence
 * with one more backtick
 */
function getCodeFence(content: string): string {
  const backtickMatches = content.match(/`+/g)

  if (!backtickMatches) {
    return '```'
  }

  const maxLength = Math.max(...backtickMatches.map((match) => match.length))

  return '`'.repeat(maxLength + 1)
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
  code: (children) => `\`${prepareInlineCode(children)}\``,
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
  li: (children) => `- ${prepareInlineText(children)}`,

  // blockquote

  blockquote: (children) =>
    children
      .split('\n')
      .map((line) => `> ${prepareInlineText(line)}`)
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

    const fence = getCodeFence(children)

    return language
      ? `${fence}${
          language ? prepareInlineText(language) : ''
        }\n${children}\n${fence}`
      : `${fence}\n${children}\n${fence}`
  },
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
 * Convert JSX children to Markdown string
 */
function convertChildren(children: JSXChild): string {
  return joinParts(collectConvertedParts(children))
}

/**
 * Convert a single React element to Markdown
 */
function convertElement(element: ReactElement): string {
  return joinParts(convertElementToParts(element))
}

/**
 * Convert JSX/React elements to Markdown
 *
 * @param jsx - React element(s) to convert
 * @returns Markdown string representation
 */
export function prompt(jsx: ReactElement | ReactElement[]): string {
  if (Array.isArray(jsx)) {
    const parts = jsx.flatMap((element) => convertElementToParts(element))

    return joinParts(parts)
  }

  return convertElement(jsx)
}

/**
 * Default export for convenience
 */
export default prompt

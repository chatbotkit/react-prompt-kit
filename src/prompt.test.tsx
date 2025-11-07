import React from 'react'

import { prompt } from './prompt'

describe('prompt', () => {
  describe('headings', () => {
    it('should convert h1 to markdown', () => {
      const result = prompt(<h1>test</h1>)
      expect(result).toBe('# test')
    })

    it('should convert h2 to markdown', () => {
      const result = prompt(<h2>test</h2>)
      expect(result).toBe('## test')
    })

    it('should convert h3 to markdown', () => {
      const result = prompt(<h3>test</h3>)
      expect(result).toBe('### test')
    })

    it('should convert h4 to markdown', () => {
      const result = prompt(<h4>test</h4>)
      expect(result).toBe('#### test')
    })

    it('should convert h5 to markdown', () => {
      const result = prompt(<h5>test</h5>)
      expect(result).toBe('##### test')
    })

    it('should convert h6 to markdown', () => {
      const result = prompt(<h6>test</h6>)
      expect(result).toBe('###### test')
    })

    it('should strip XML tags from headings', () => {
      const result = prompt(
        <h1>
          System <custom>Instructions</custom> for AI
        </h1>
      )
      expect(result).toBe('# System Instructions for AI')
    })

    it('should normalize whitespace in headings (replace newlines with spaces)', () => {
      const result = prompt(<h2>This is a heading{'\n'}with multiple lines</h2>)
      expect(result).toBe('## This is a heading with multiple lines')
    })

    it('should handle complex headings with XML and newlines', () => {
      const result = prompt(
        <h1>
          Welcome to{'\n'}
          <emphasis>React Prompt Kit</emphasis>
          {'\n'}Documentation
        </h1>
      )
      expect(result).toBe('# Welcome to React Prompt Kit Documentation')
    })
  })

  describe('paragraphs', () => {
    it('should convert p to text', () => {
      const result = prompt(<p>Hello</p>)
      expect(result).toBe('Hello')
    })

    it('should handle empty paragraph', () => {
      const result = prompt(<p></p>)
      expect(result).toBe('')
    })
  })

  describe('text formatting', () => {
    it('should convert strong to bold markdown', () => {
      const result = prompt(<strong>bold</strong>)
      expect(result).toBe('**bold**')
    })

    it('should convert b to bold markdown', () => {
      const result = prompt(<b>bold</b>)
      expect(result).toBe('**bold**')
    })

    it('should convert em to italic markdown', () => {
      const result = prompt(<em>italic</em>)
      expect(result).toBe('_italic_')
    })

    it('should convert i to italic markdown', () => {
      const result = prompt(<i>italic</i>)
      expect(result).toBe('_italic_')
    })

    it('should convert code to inline code', () => {
      const result = prompt(<code>code</code>)
      expect(result).toBe('`code`')
    })

    it('should convert del to strikethrough', () => {
      const result = prompt(<del>deleted</del>)
      expect(result).toBe('~~deleted~~')
    })

    it('should convert s to strikethrough', () => {
      const result = prompt(<s>strike</s>)
      expect(result).toBe('~~strike~~')
    })

    it('should strip XML tags from inline formatting', () => {
      const result = prompt(
        <strong>
          This is <custom>important</custom> text
        </strong>
      )
      expect(result).toBe('**This is important text**')
    })

    it('should normalize whitespace in inline formatting', () => {
      const result = prompt(<em>text with{'\n'}newlines</em>)
      expect(result).toBe('_text with newlines_')
    })

    it('should handle code with XML and whitespace', () => {
      const result = prompt(
        <code>
          const x = <value>1</value>
        </code>
      )
      expect(result).toBe('`const x = 1`')
    })
  })

  describe('links', () => {
    it('should convert a tag with href', () => {
      const result = prompt(<a href="https://example.com">link</a>)
      expect(result).toBe('[link](https://example.com)')
    })

    it('should handle a tag without href', () => {
      const result = prompt(<a>link</a>)
      expect(result).toBe('[link]()')
    })

    it('should strip XML tags from link text', () => {
      const result = prompt(
        <a href="https://example.com">
          Click <emphasis>here</emphasis> for more
        </a>
      )
      expect(result).toBe('[Click here for more](https://example.com)')
    })

    it('should normalize whitespace in link text', () => {
      const result = prompt(<a href="/docs">Read{'\n'}Documentation</a>)
      expect(result).toBe('[Read Documentation](/docs)')
    })
  })

  describe('lists', () => {
    it('should convert li to list item', () => {
      const result = prompt(<li>item</li>)
      expect(result).toBe('- item')
    })

    it('should handle ul with li children', () => {
      const result = prompt(
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      )
      expect(result).toBe('- item 1\n- item 2')
    })
  })

  describe('blockquote', () => {
    it('should convert blockquote to markdown quote', () => {
      const result = prompt(<blockquote>quote</blockquote>)
      expect(result).toBe('> quote')
    })

    it('should handle multiline blockquote', () => {
      const result = prompt(<blockquote>line 1{'\n'}line 2</blockquote>)
      expect(result).toBe('> line 1\n> line 2')
    })
  })

  describe('special elements', () => {
    it('should convert hr to horizontal rule', () => {
      const result = prompt(<hr />)
      expect(result).toBe('---')
    })

    it('should convert br to newline', () => {
      const result = prompt(<br />)
      expect(result).toBe('\n')
    })

    it('should convert pre to code block', () => {
      const result = prompt(<pre>code block</pre>)
      expect(result).toBe('```\ncode block\n```')
    })

    it('should convert pre with language parameter', () => {
      const result = prompt(
        React.createElement('pre', { language: 'javascript' }, 'const x = 1;')
      )
      expect(result).toBe('```javascript\nconst x = 1;\n```')
    })

    it('should convert pre with typescript language', () => {
      const result = prompt(
        React.createElement(
          'pre',
          { language: 'typescript' },
          'const x: number = 1;'
        )
      )
      expect(result).toBe('```typescript\nconst x: number = 1;\n```')
    })

    it('should convert pre with python language', () => {
      const result = prompt(
        React.createElement(
          'pre',
          { language: 'python' },
          'def hello():\n    print("Hello")'
        )
      )
      expect(result).toBe('```python\ndef hello():\n    print("Hello")\n```')
    })

    it('should handle pre with language parameter in jsx', () => {
      const result = prompt(
        <pre data-language="python">
          {`def hello():
    print("Hello")`}
        </pre>
      )
      expect(result).toBe('```python\ndef hello():\n    print("Hello")\n```')
    })

    it('should handle pre without language parameter', () => {
      const result = prompt(<pre>plain code</pre>)
      expect(result).toBe('```\nplain code\n```')
    })
  })

  describe('combined elements', () => {
    it('should handle h1 followed by p', () => {
      const result = prompt(
        <>
          <h1>test</h1>
          <p>Hello</p>
        </>
      )
      expect(result).toBe('# test\n\nHello')
    })

    it('should handle h1 followed by p inside fragment', () => {
      const result = prompt(
        <>
          <h1>RULES</h1>
          <p>You are an assistant</p>
        </>
      )
      expect(result).toBe('# RULES\n\nYou are an assistant')
    })

    it('should handle multiple fragments with conditional rendering', () => {
      const showExtra = true
      const result = prompt(
        <>
          <h1>REMEMBER</h1>
          <p>Today is Monday</p>
          {showExtra && (
            <>
              <p>Extra info</p>
            </>
          )}
          <h1>RULES</h1>
          <p>Follow the rules</p>
        </>
      )
      expect(result).toBe(
        '# REMEMBER\n\nToday is Monday\n\nExtra info\n\n# RULES\n\nFollow the rules'
      )
    })

    it('should handle nested formatting', () => {
      const result = prompt(
        <p>
          This is <strong>bold</strong> and <em>italic</em>
        </p>
      )
      expect(result).toBe('This is **bold** and _italic_')
    })

    it('should handle complex nesting', () => {
      const result = prompt(
        <p>
          Text with{' '}
          <strong>
            bold and <em>italic</em>
          </strong>
        </p>
      )
      expect(result).toBe('Text with **bold and _italic_**')
    })
  })

  describe('custom elements', () => {
    it('should preserve custom element without attributes', () => {
      const result = prompt(<custom-element>test</custom-element>)
      expect(result).toBe('<custom-element>\ntest\n</custom-element>')
    })

    it('should preserve custom element with string attributes', () => {
      const result = prompt(<custom-element name="value">test</custom-element>)
      expect(result).toBe(
        '<custom-element name="value">\ntest\n</custom-element>'
      )
    })

    it('should preserve custom element with boolean attributes', () => {
      const result = prompt(<custom-element enabled>test</custom-element>)
      expect(result).toBe('<custom-element enabled>\ntest\n</custom-element>')
    })

    it('should preserve custom element with mixed attributes', () => {
      const result = prompt(
        <custom-element name="test" enabled>
          content
        </custom-element>
      )
      expect(result).toBe(
        '<custom-element name="test" enabled>\ncontent\n</custom-element>'
      )
    })

    it('should preserve self-closing custom element', () => {
      const result = prompt(<custom-element />)
      expect(result).toBe('<custom-element />')
    })
  })

  describe('edge cases', () => {
    it('should handle empty string', () => {
      const result = prompt(<p></p>)
      expect(result).toBe('')
    })

    it('should handle null children', () => {
      const result = prompt(<p>{null}</p>)
      expect(result).toBe('')
    })

    it('should handle undefined children', () => {
      const result = prompt(<p>{undefined}</p>)
      expect(result).toBe('')
    })

    it('should handle boolean children', () => {
      const result = prompt(<p>{false}</p>)
      expect(result).toBe('')
    })

    it('should handle number children', () => {
      const result = prompt(<p>{42}</p>)
      expect(result).toBe('42')
    })

    it('should handle array of elements', () => {
      const result = prompt([<h1>First</h1>, <p>Second</p>])
      expect(result).toBe('# First\n\nSecond')
    })
  })

  describe('examples from issue', () => {
    it('should handle example 1: h1 + p', () => {
      const result = prompt(
        <>
          <h1>test</h1>
          <p>Hello</p>
        </>
      )
      expect(result).toBe('# test\n\nHello')
    })

    it('should handle example 2: custom element preserved', () => {
      const result = prompt(<custom-element>test</custom-element>)
      expect(result).toBe('<custom-element>\ntest\n</custom-element>')
    })
  })

  describe('real-world examples', () => {
    it('should convert a prompt with multiple elements', () => {
      const result = prompt(
        <>
          <h1>System Prompt</h1>
          <p>
            You are a helpful assistant. Please follow these{' '}
            <strong>instructions</strong>:
          </p>
          <ul>
            <li>Be concise</li>
            <li>Be accurate</li>
          </ul>
        </>
      )
      expect(result).toBe(
        '# System Prompt\n\nYou are a helpful assistant. Please follow these **instructions**:\n\n- Be concise\n- Be accurate'
      )
    })

    it('should mix standard and custom elements', () => {
      const result = prompt(
        <>
          <h2>Instructions</h2>
          <p>Use the following tool:</p>
          <tool-definition name="search">Search the web</tool-definition>
        </>
      )
      expect(result).toBe(
        '## Instructions\n\nUse the following tool:\n\n<tool-definition name="search">\nSearch the web\n</tool-definition>'
      )
    })
  })

  describe('strange cases', () => {
    it('should create a link button', () => {
      const result = prompt(
        <>
          <a>test</a>
        </>
      )

      expect(result).toBe('[test]()')
    })
  })
})

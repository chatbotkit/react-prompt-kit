import React from 'react'

import {
  Answer,
  Code,
  Constraints,
  Context,
  Data,
  Document,
  Example,
  Examples,
  Findings,
  Formatting,
  FormattingExample,
  Instructions,
  Recommendations,
  Task,
  Thinking,
} from './components'
import { prompt } from './prompt'

describe('prompt engineering components', () => {
  describe('React component wrappers', () => {
    it('should render Instructions component (passes through children)', () => {
      const result = prompt(
        <Instructions>
          <p>Follow these steps:</p>
          <ul>
            <li>Analyze the data</li>
            <li>Provide recommendations</li>
          </ul>
        </Instructions>
      )

      // @note Instructions component creates <instructions> XML tags
      expect(result).toContain('<instructions>')
      expect(result).toContain('Follow these steps:')
      expect(result).toContain('- Analyze the data')
      expect(result).toContain('- Provide recommendations')
      expect(result).toContain('</instructions>')
    })

    it('should render Context component (passes through children)', () => {
      const result = prompt(
        <Context>
          <p>You are a financial analyst at AcmeCorp.</p>
        </Context>
      )

      // @note Context component creates <context> XML tags
      expect(result).toContain('<context>')
      expect(result).toContain('You are a financial analyst')
      expect(result).toContain('</context>')
    })

    it('should render Data component (passes through children)', () => {
      const result = prompt(<Data>Revenue: $15.2M</Data>)

      // @note Data component creates <data> XML tags
      expect(result).toContain('<data>')
      expect(result).toContain('Revenue: $15.2M')
      expect(result).toContain('</data>')
    })

    it('should render Examples component with nested Example components', () => {
      const result = prompt(
        <Examples>
          <Example>
            <p>Input: Hello</p>
            <p>Output: Hi there!</p>
          </Example>
          <Example>
            <p>Input: Goodbye</p>
            <p>Output: See you later!</p>
          </Example>
        </Examples>
      )

      // @note React components create XML tags
      expect(result).toContain('<examples>')
      expect(result).toContain('<example>')
      expect(result).toContain('Input: Hello')
      expect(result).toContain('Output: Hi there!')
      expect(result).toContain('Input: Goodbye')
      expect(result).toContain('Output: See you later!')
      expect(result).toContain('</example>')
      expect(result).toContain('</examples>')
    })

    it('should render Thinking and Answer components', () => {
      const result = prompt(
        <>
          <Thinking>
            <p>First, I need to analyze the data...</p>
          </Thinking>
          <Answer>
            <p>Based on my analysis, the recommendation is...</p>
          </Answer>
        </>
      )

      // @note React components create XML tags
      expect(result).toContain('<thinking>')
      expect(result).toContain('First, I need to analyze')
      expect(result).toContain('</thinking>')
      expect(result).toContain('<answer>')
      expect(result).toContain('Based on my analysis')
      expect(result).toContain('</answer>')
    })

    it('should render Formatting and FormattingExample components', () => {
      const result = prompt(
        <>
          <Formatting>
            <p>Use concise, bullet-point format</p>
          </Formatting>
          <FormattingExample>
            <ul>
              <li>Item 1: Description</li>
              <li>Item 2: Description</li>
            </ul>
          </FormattingExample>
        </>
      )

      // @note React components create XML tags
      expect(result).toContain('<formatting>')
      expect(result).toContain('Use concise, bullet-point format')
      expect(result).toContain('</formatting>')
      expect(result).toContain('<formatting_example>')
      expect(result).toContain('- Item 1: Description')
      expect(result).toContain('- Item 2: Description')
      expect(result).toContain('</formatting_example>')
    })

    it('should render Document component', () => {
      const result = prompt(
        <Document>
          <h1>Contract Agreement</h1>
          <p>This agreement is made between...</p>
        </Document>
      )

      // @note Document component creates <document> XML tags
      expect(result).toContain('<document>')
      expect(result).toContain('# Contract Agreement')
      expect(result).toContain('This agreement is made between...')
      expect(result).toContain('</document>')
    })

    it('should work with Code component and language prop', () => {
      const result = prompt(<Code language="typescript">const x = 1;</Code>)

      // @note Code component creates <codeblock> XML tags with language attribute
      expect(result).toContain('<codeblock language="typescript">')
      expect(result).toContain('const x = 1;')
      expect(result).toContain('</codeblock>')
    })
  })

  describe('standard HTML pre tag for code blocks', () => {
    it('should render pre tag with language attribute as code block', () => {
      const result = prompt(
        <pre {...({ language: 'typescript' } as any)}>
          const greeting = "Hello World";{'\n'}
          console.log(greeting);
        </pre>
      )

      expect(result).toContain('```typescript')
      expect(result).toContain('const greeting')
      expect(result).toContain('```')
    })

    it('should render pre tag with data-language attribute as code block', () => {
      const result = prompt(
        <pre data-language="python">
          def hello():{'\n'}
          {'    '}print("Hello World")
        </pre>
      )

      expect(result).toContain('```python')
      expect(result).toContain('def hello')
      expect(result).toContain('```')
    })

    it('should render Findings and Recommendations components', () => {
      const result = prompt(
        <>
          <Findings>
            <ul>
              <li>Revenue increased by 22%</li>
              <li>Costs decreased by 5%</li>
            </ul>
          </Findings>
          <Recommendations>
            <ul>
              <li>Continue current strategy</li>
              <li>Invest in marketing</li>
            </ul>
          </Recommendations>
        </>
      )

      // @note React components create XML tags
      expect(result).toContain('<findings>')
      expect(result).toContain('Revenue increased by 22%')
      expect(result).toContain('Costs decreased by 5%')
      expect(result).toContain('</findings>')
      expect(result).toContain('<recommendations>')
      expect(result).toContain('Continue current strategy')
      expect(result).toContain('Invest in marketing')
      expect(result).toContain('</recommendations>')
    })
  })

  describe('using custom XML tags directly', () => {
    it('should preserve custom XML tags like <context>, <data>, etc.', () => {
      const spreadsheetData = 'Q2 Revenue: $15.2M, Growth: 22%'
      const q1Report = 'Q1 Revenue: $12.5M, Growth: 18%'

      const result = prompt(
        <>
          <context>
            <p>You're a financial analyst at AcmeCorp, a B2B SaaS company.</p>
          </context>

          <data>{spreadsheetData}</data>

          <instructions>
            <ul>
              <li>
                Include sections: Revenue Growth, Profit Margins, Cash Flow
              </li>
              <li>Highlight strengths and areas for improvement</li>
            </ul>
          </instructions>

          <formatting>
            <p>Make your tone concise and professional.</p>
          </formatting>

          <formatting_example>{q1Report}</formatting_example>
        </>
      )

      expect(result).toContain('<context>')
      expect(result).toContain('financial analyst')
      expect(result).toContain('</context>')
      expect(result).toContain('<data>')
      expect(result).toContain('Q2 Revenue: $15.2M')
      expect(result).toContain('</data>')
      expect(result).toContain('<instructions>')
      expect(result).toContain('Revenue Growth')
      expect(result).toContain('</instructions>')
      expect(result).toContain('<formatting_example>')
      expect(result).toContain('Q1 Revenue: $12.5M')
      expect(result).toContain('</formatting_example>')
    })

    it('should preserve custom XML tags for legal contract analysis', () => {
      const contract = 'Software License Agreement...'
      const standardContract = 'Standard Agreement Template...'

      const result = prompt(
        <>
          <task>
            <p>
              Analyze this software licensing agreement for legal risks and
              liabilities.
            </p>
          </task>

          <document>{contract}</document>

          <context>
            <p>Reference standard contract:</p>
            <document>{standardContract}</document>
          </context>

          <instructions>
            <ul>
              <li>
                Analyze: Indemnification, Limitation of liability, IP ownership
              </li>
              <li>Note unusual or concerning terms</li>
              <li>Compare to our standard contract</li>
              <li>
                Summarize findings in <code>&lt;findings&gt;</code> tags
              </li>
              <li>
                List recommendations in <code>&lt;recommendations&gt;</code>{' '}
                tags
              </li>
            </ul>
          </instructions>
        </>
      )

      expect(result).toContain('<task>')
      expect(result).toContain('Analyze this software licensing')
      expect(result).toContain('</task>')
      expect(result).toContain('<document>')
      expect(result).toContain('Software License Agreement')
      expect(result).toContain('</document>')
      expect(result).toContain('<instructions>')
      expect(result).toContain('Indemnification')
      expect(result).toContain('`<findings>`')
    })

    it('should preserve custom XML tags for task and constraints', () => {
      const result = prompt(
        <>
          <task>
            <p>Write a product description for our new SaaS platform</p>
          </task>
          <constraints>
            <ul>
              <li>Maximum 200 words</li>
              <li>Focus on benefits, not features</li>
              <li>Professional but friendly tone</li>
            </ul>
          </constraints>
        </>
      )

      expect(result).toContain('<task>')
      expect(result).toContain('Write a product description')
      expect(result).toContain('</task>')
      expect(result).toContain('<constraints>')
      expect(result).toContain('Maximum 200 words')
      expect(result).toContain('</constraints>')
    })
  })

  describe('React component wrappers usage', () => {
    it('should work with Task and Constraints React components', () => {
      const result = prompt(
        <>
          <Task>
            <p>Write a product description for our new SaaS platform</p>
          </Task>
          <Constraints>
            <ul>
              <li>Maximum 200 words</li>
              <li>Focus on benefits, not features</li>
            </ul>
          </Constraints>
        </>
      )

      // @note React components create XML tags
      expect(result).toContain('<task>')
      expect(result).toContain('Write a product description')
      expect(result).toContain('</task>')
      expect(result).toContain('<constraints>')
      expect(result).toContain('Maximum 200 words')
      expect(result).toContain('Focus on benefits')
      expect(result).toContain('</constraints>')
    })
  })
})

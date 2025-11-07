# React Prompt Kit

A React-based toolkit for building structured prompts using JSX, inspired by Claude's XML tags best practices.

## Features

- 🎯 **Structured Prompts** - Use React components to build well-organized prompts
- 🏷️ **XML Tag Preservation** - Components output proper XML tags for AI prompt engineering
- 📝 **Markdown Conversion** - Standard HTML elements convert to clean Markdown
- 🔧 **TypeScript Support** - Full type definitions included
- 🧩 **Composable** - Mix and match 50+ pre-built components
- 🎨 **Flexible** - Use with any LLM that supports structured prompts

## Installation

```bash
npm install react-prompt-kit
# or
yarn add react-prompt-kit
# or
pnpm add react-prompt-kit
```

## Quick Start

```tsx
import prompt, { Instructions, Context, Task } from 'react-prompt-kit'

const myPrompt = prompt(
  <>
    <Context>
      <p>You are a helpful AI assistant.</p>
    </Context>
    <Task>
      <p>Analyze the following data and provide insights.</p>
    </Task>
    <Instructions>
      <ul>
        <li>Identify key trends</li>
        <li>Highlight anomalies</li>
        <li>Suggest recommendations</li>
      </ul>
    </Instructions>
  </>
)

console.log(myPrompt)
// Output:
// <context>You are a helpful AI assistant.</context>
//
// <task>Analyze the following data and provide insights.</task>
//
// <instructions>- Identify key trends
// - Highlight anomalies
// - Suggest recommendations</instructions>
```

## Basic Usage

The library provides a `prompt()` function that converts JSX/React elements to Markdown, and a set of prompt engineering components that output XML tags.

### Converting JSX to Markdown

```tsx
import { prompt } from 'react-prompt-kit'

const markdown = prompt(
  <>
    <h1>Hello World</h1>
    <p>This is a paragraph</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </>
)

console.log(markdown)
// Output:
// # Hello World
//
// This is a paragraph
//
// - Item 1
// - Item 2
```

### Using Prompt Engineering Components

The library includes 50+ components based on Claude's XML tags guide. These components **wrap content in XML tags** for structured prompt engineering:

```tsx
import {
  prompt,
  Instructions,
  Context,
  Examples,
  Example,
} from 'react-prompt-kit'

const result = prompt(
  <>
    <Context>
      <p>You are a helpful AI assistant specialized in data analysis.</p>
    </Context>

    <Instructions>
      <p>Follow these steps:</p>
      <ul>
        <li>Analyze the provided data</li>
        <li>Identify key trends</li>
        <li>Provide actionable recommendations</li>
      </ul>
    </Instructions>

    <Examples>
      <Example>
        <p>
          <strong>Input:</strong> Sales data Q1 2024
        </p>
        <p>
          <strong>Output:</strong> Revenue increased 15%, recommend expanding
          marketing budget
        </p>
      </Example>
    </Examples>
  </>
)

console.log(prompt)
// Output:
// <context>You are a helpful AI assistant specialized in data analysis.</context>
//
// <instructions>Follow these steps:
//
// - Analyze the provided data
// - Identify key trends
// - Provide actionable recommendations</instructions>
//
// <examples><example>**Input:** Sales data Q1 2024
//
// **Output:** Revenue increased 15%, recommend expanding marketing budget</example></examples>
```

**Note:** The components render XML tags around the content. Standard HTML elements (h1, p, ul, etc.) inside are converted to Markdown syntax.

## Available Components

All components wrap their content in corresponding XML tags:

### Core Instruction Components

- `<Instructions>` → `<instructions>...</instructions>`
- `<Context>` → `<context>...</context>`
- `<Task>` → `<task>...</task>`
- `<Role>` → `<role>...</role>`
- `<Objective>` → `<objective>...</objective>`
- `<Goal>` → `<goal>...</goal>`
- `<Guidelines>` → `<guidelines>...</guidelines>`
- `<Rules>` → `<rules>...</rules>`
- `<Constraints>` → `<constraints>...</constraints>`

### Input/Output Components

- `<Data>` → `<data>...</data>`
- `<Input>` → `<input>...</input>`
- `<Query>` → `<query>...</query>`
- `<UserQuery>` → `<user_query>...</user_query>`
- `<Output>` → `<output>...</output>`
- `<Result>` → `<result>...</result>`
- `<Answer>` → `<answer>...</answer>`
- `<Response>` → `<response>...</response>`

### Example Components

- `<Examples>` → `<examples>...</examples>`
- `<Example>` → `<example>...</example>`
- `<FormattingExample>` → `<formatting_example>...</formatting_example>`

### Document Components

- `<Document>` → `<document>...</document>`
- `<Contract>` → `<contract>...</contract>`
- `<StandardContract>` → `<standard_contract>...</standard_contract>`

### Analysis Components

- `<Thinking>` → `<thinking>...</thinking>`
- `<Analysis>` → `<analysis>...</analysis>`
- `<Reasoning>` → `<reasoning>...</reasoning>`
- `<Findings>` → `<findings>...</findings>`
- `<Recommendations>` → `<recommendations>...</recommendations>`

### Code and Technical Components

- `<Code language="...">` → `<codeblock language="...">...</codeblock>`
  - Note: Use the `language` prop to specify the programming language
  - For markdown code blocks, use standard `<pre>` tag instead

## Advanced Usage

### Mixing Standard HTML and Components

```tsx
import { prompt, Task, Document, Instructions } from 'react-prompt-kit'

const result = prompt(
  <>
    <Task>
      <p>Analyze the following contract for potential issues:</p>
    </Task>

    <Document>
      <h1>Service Agreement</h1>
      <p>This agreement is made between...</p>
      <ul>
        <li>Term: 12 months</li>
        <li>Payment: Net 30</li>
      </ul>
    </Document>

    <Instructions>
      <p>Focus on:</p>
      <ol>
        <li>Liability clauses</li>
        <li>Termination conditions</li>
        <li>Payment terms</li>
      </ol>
    </Instructions>
  </>
)
```

### Using Code Blocks

For code blocks, you have two options:

1. **XML-style with `<Code>` component** (preserves as XML):

```tsx
import { prompt, Code } from 'react-prompt-kit'

const result = prompt(<Code language="typescript">const x = 1;</Code>)
// Output: <codeblock language="typescript">const x = 1;</codeblock>
```

2. **Markdown-style with `<pre>` tag** (converts to markdown):

```tsx
const markdown = prompt(<pre language="typescript">const x = 1;</pre>)
// Output:
// ```typescript
// const x = 1;
// ```
````

## TypeScript Support

The library is written in TypeScript and provides full type definitions:

```tsx
import { prompt, Instructions, Context } from 'react-prompt-kit'
import type { ReactNode } from 'react'

// All components accept ReactNode children
const MyComponent = ({ children }: { children: ReactNode }) => (
  <Instructions>
    <Context>{children}</Context>
  </Instructions>
)

const result = prompt(<MyComponent>Custom content</MyComponent>)

## Real-World Example

```tsx
import {
  prompt,
  Context,
  Task,
  Data,
  Instructions,
  Formatting,
  Examples,
  Example,
} from 'react-prompt-kit'

const createAnalysisPrompt = (reportData: string) =>
  prompt(
    <>
      <Context>
        <p>You are a financial analyst at AcmeCorp.</p>
        <p>
          Your expertise includes quarterly report analysis, trend
          identification, and strategic recommendations.
        </p>
      </Context>

      <Task>
        <p>Analyze the Q1 2024 financial report and provide recommendations.</p>
      </Task>

      <Data>{reportData}</Data>

      <Instructions>
        <ol>
          <li>Calculate key financial ratios (ROI, profit margin, etc.)</li>
          <li>Identify significant trends compared to Q4 2023</li>
          <li>Assess risks and opportunities</li>
          <li>Provide 3-5 actionable recommendations</li>
        </ol>
      </Instructions>

      <Formatting>
        <p>Use the following structure:</p>
        <ul>
          <li>Executive Summary (2-3 sentences)</li>
          <li>Key Metrics (bullet points)</li>
          <li>Trends (bullet points)</li>
          <li>Recommendations (numbered list)</li>
        </ul>
      </Formatting>

      <Examples>
        <Example>
          <p>
            <strong>Executive Summary:</strong> Revenue increased 15% YoY,
            driven by strong product sales...
          </p>
        </Example>
      </Examples>
    </>
  )

// Use in your application
const result = createAnalysisPrompt('Revenue: $15.2M, Costs: $8.1M...')
console.log(result)
```

## Component Behavior Summary

| Component Type    | Input                               | Output                                      |
| ----------------- | ----------------------------------- | ------------------------------------------- |
| Standard HTML     | `<h1>Title</h1>`                    | `# Title` (markdown)                        |
| Prompt Components | `<Instructions>text</Instructions>` | `<instructions>text</instructions>`         |
| Code Component    | `<Code language="js">code</Code>`   | `<codeblock language="js">code</codeblock>` |
| Pre Tag           | `<pre language="js">code</pre>`     | ` ```js\ncode\n``` ` (markdown)             |

The key difference:

- **Standard HTML elements** (h1, p, ul, etc.) are converted to **Markdown syntax**
- **Prompt components** (Instructions, Context, etc.) are preserved as **XML tags**
- **`<pre>` tags** are converted to **Markdown code blocks**
- **`<Code>` component** is preserved as **`<codeblock>` XML tag**

## Using Custom XML Tags

For prompt engineering, you'll want to use actual custom XML tags. You can create them directly in JSX:

```typescript
import { prompt } from 'react-prompt-kit'

const structuredPrompt = prompt(
  <>
    <context>
      <p>You're a financial analyst at AcmeCorp, a B2B SaaS company.</p>
    </context>

    <data>Q2 Revenue: $15.2M, Growth: 22%</data>

    <instructions>
      <ul>
        <li>Include sections: Revenue Growth, Profit Margins, Cash Flow</li>
        <li>Highlight strengths and areas for improvement</li>
      </ul>
    </instructions>

    <formatting>
      <p>Make your tone concise and professional.</p>
    </formatting>
  </>
)
```

Output:

```markdown
<context>You're a financial analyst at AcmeCorp, a B2B SaaS company.</context>

<data>Q2 Revenue: $15.2M, Growth: 22%</data>

<instructions>- Include sections: Revenue Growth, Profit Margins, Cash Flow

- Highlight strengths and areas for improvement</instructions>

<formatting>Make your tone concise and professional.</formatting>
```

## Available Component Wrappers

While you can use custom XML tags directly, the library provides convenient React components for better TypeScript support and consistency:

### Core Structural Components

- `<Instructions>` - Task instructions
- `<Context>` - Background context
- `<Data>` - Input data
- `<Examples>` - Example container
- `<Example>` - Individual examples

### Thinking & Reasoning

- `<Thinking>` - Chain of thought reasoning
- `<Answer>` - Final answer
- `<Analysis>` - Analytical content
- `<Reasoning>` - Reasoning steps

### Output Formatting

- `<Formatting>` - Format instructions
- `<FormattingExample>` - Format examples
- `<Output>` - Expected output
- `<Result>` - Result container

### Document Components

- `<Document>` - Document container
- `<Documents>` - Multiple documents
- `<Content>` - Content section
- `<Text>` - Text content

### Domain-Specific

- `<Contract>` - Legal contracts
- `<Agreement>` - Agreements
- `<StandardContract>` - Standard contract templates
- `<Code>` - Code blocks (with optional `language` prop)
- `<Query>` - Search queries
- `<UserQuery>` - User questions

### Analysis & Findings

- `<Findings>` - Analysis findings
- `<Recommendations>` - Recommendations
- `<Summary>` - Summary content
- `<Conclusion>` - Conclusions

### Conversation

- `<Conversation>` - Conversation container
- `<Message>` - Individual messages
- `<Question>` - Questions
- `<Response>` - Responses

### Constraints & Requirements

- `<Constraints>` - Constraints
- `<Requirements>` - Requirements
- `<Guidelines>` - Guidelines
- `<Rules>` - Rules

### Input & Reference

- `<Input>` - Input data
- `<Reference>` - References
- `<Source>` - Source materials
- `<Citation>` - Citations

### Task & Goals

- `<Task>` - Task description
- `<Goal>` - Goals
- `<Objective>` - Objectives

### Error & Validation

- `<Error>` - Errors
- `<Warning>` - Warnings
- `<Validation>` - Validation results

### Metadata

- `<Metadata>` - Metadata
- `<Tags>` - Tags
- `<Categories>` - Categories

## Real-World Examples

### Financial Report Generation

```typescript
import { prompt } from 'react-prompt-kit'

const generateFinancialReport = (spreadsheetData: string, q1Report: string) => {
  return prompt(
    <>
      <context>
        <p>You're a financial analyst at AcmeCorp, a B2B SaaS company.</p>
        <p>Our investors value transparency and actionable insights.</p>
      </context>

      <data>{spreadsheetData}</data>

      <instructions>
        <ul>
          <li>Include sections: Revenue Growth, Profit Margins, Cash Flow</li>
          <li>Highlight strengths and areas for improvement</li>
        </ul>
      </instructions>

      <formatting>
        <p>Make your tone concise and professional.</p>
      </formatting>

      <formatting_example>{q1Report}</formatting_example>
    </>
  )
}
```

### Legal Contract Analysis

```typescript
import { prompt } from 'react-prompt-kit'

const analyzeLegalContract = (contract: string, standardContract: string) => {
  return prompt(
    <>
      <task>
        <p>
          Analyze this software licensing agreement for legal risks and
          liabilities. We're a multinational enterprise considering this
          agreement for our core data infrastructure.
        </p>
      </task>

      <agreement>{contract}</agreement>

      <context>
        <p>This is our standard contract for reference:</p>
        <standard_contract>{standardContract}</standard_contract>
      </context>

      <instructions>
        <ul>
          <li>
            Analyze these clauses:
            <ul>
              <li>Indemnification</li>
              <li>Limitation of liability</li>
              <li>IP ownership</li>
            </ul>
          </li>
          <li>Note unusual or concerning terms</li>
          <li>Compare to our standard contract</li>
          <li>
            Summarize findings in <code>&lt;findings&gt;</code> tags
          </li>
          <li>
            List recommendations in <code>&lt;recommendations&gt;</code> tags
          </li>
        </ul>
      </instructions>
    </>
  )
}
```

### Chain of Thought Prompting

```typescript
import { prompt } from 'react-prompt-kit'

const solveComplexProblem = (problem: string) => {
  return prompt(
    <>
      <problem>{problem}</problem>

      <instructions>
        <p>
          Before providing your final answer, work through the problem step by
          step:
        </p>
        <ul>
          <li>
            Use <code>&lt;thinking&gt;</code> tags to show your reasoning
          </li>
          <li>
            Provide your final solution in <code>&lt;answer&gt;</code> tags
          </li>
        </ul>
      </instructions>
    </>
  )
}
```

## Best Practices

1. **Be Consistent**: Use the same tag names throughout your prompts
2. **Nest Tags**: Use nested structure for hierarchical content
3. **Clear Separation**: Separate different parts of your prompt clearly
4. **Reference Tags**: Refer to tag names when talking about content (e.g., "Using the data in `<data>` tags...")

## Why Use XML Tags?

- **Clarity**: Clearly separate different parts of your prompt
- **Accuracy**: Reduce errors from AI misinterpreting prompt parts
- **Flexibility**: Easily modify parts without rewriting everything
- **Parseability**: Easy to extract specific parts from AI output

## TypeScript Support

All components are fully typed with TypeScript for better developer experience:

```typescript
import type { ReactNode } from 'react'
import { Context, Instructions, prompt } from 'react-prompt-kit'

// Full type safety
const myPrompt = prompt(
  <>
    <Context>
      <p>Type-safe context</p>
    </Context>
  </>
)
```

## License

MIT

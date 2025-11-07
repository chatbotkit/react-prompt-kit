import React, { type ReactNode } from 'react'

/**
 * Common prompt engineering components based on XML tag best practices
 * @see https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags
 */

// Core structural components

export function Instructions({ children }: { children: ReactNode }) {
  return <instructions>{children}</instructions>
}

export function Context({ children }: { children: ReactNode }) {
  return <context>{children}</context>
}

export function Data({ children }: { children: ReactNode }) {
  return <data>{children}</data>
}

export function Examples({ children }: { children: ReactNode }) {
  return <examples>{children}</examples>
}

export function Example({ children }: { children: ReactNode }) {
  return <example>{children}</example>
}

// Thinking and reasoning components

export function Thinking({ children }: { children: ReactNode }) {
  return <thinking>{children}</thinking>
}

export function Answer({ children }: { children: ReactNode }) {
  return <answer>{children}</answer>
}

export function Analysis({ children }: { children: ReactNode }) {
  return <analysis>{children}</analysis>
}

export function Reasoning({ children }: { children: ReactNode }) {
  return <reasoning>{children}</reasoning>
}

// Output formatting components

export function Formatting({ children }: { children: ReactNode }) {
  return <formatting>{children}</formatting>
}

export function FormattingExample({ children }: { children: ReactNode }) {
  return <formatting_example>{children}</formatting_example>
}

export function Output({ children }: { children: ReactNode }) {
  return <output>{children}</output>
}

export function Result({ children }: { children: ReactNode }) {
  return <result>{children}</result>
}

// Document and content components

export function Document({ children }: { children: ReactNode }) {
  return <document>{children}</document>
}

export function Documents({ children }: { children: ReactNode }) {
  return <documents>{children}</documents>
}

export function Content({ children }: { children: ReactNode }) {
  return <content>{children}</content>
}

export function Text({ children }: { children: ReactNode }) {
  return <text>{children}</text>
}

// Specialized domain components

export function Contract({ children }: { children: ReactNode }) {
  return <contract>{children}</contract>
}

export function Agreement({ children }: { children: ReactNode }) {
  return <agreement>{children}</agreement>
}

export function StandardContract({ children }: { children: ReactNode }) {
  return <standard_contract>{children}</standard_contract>
}

export function Code({
  language,
  children,
}: {
  language?: string
  children: ReactNode
}) {
  // @note wrap in pre tag to produce markdown code blocks with backticks
  return React.createElement(
    'pre',
    { 'data-language': language } as React.HTMLAttributes<HTMLPreElement>,
    children
  )
}

export function Query({ children }: { children: ReactNode }) {
  return <query>{children}</query>
}

export function UserQuery({ children }: { children: ReactNode }) {
  return <user_query>{children}</user_query>
}

// Analysis and findings components

export function Findings({ children }: { children: ReactNode }) {
  return <findings>{children}</findings>
}

export function Recommendations({ children }: { children: ReactNode }) {
  return <recommendations>{children}</recommendations>
}

export function Summary({ children }: { children: ReactNode }) {
  return <summary>{children}</summary>
}

export function Conclusion({ children }: { children: ReactNode }) {
  return <conclusion>{children}</conclusion>
}

// Conversation and dialogue components

export function Conversation({ children }: { children: ReactNode }) {
  return <conversation>{children}</conversation>
}

export function Message({ children }: { children: ReactNode }) {
  return <message>{children}</message>
}

export function Question({ children }: { children: ReactNode }) {
  return <question>{children}</question>
}

export function Response({ children }: { children: ReactNode }) {
  return <response>{children}</response>
}

// Constraints and requirements

export function Constraints({ children }: { children: ReactNode }) {
  return <constraints>{children}</constraints>
}

export function Requirements({ children }: { children: ReactNode }) {
  return <requirements>{children}</requirements>
}

export function Guidelines({ children }: { children: ReactNode }) {
  return <guidelines>{children}</guidelines>
}

export function Rules({ children }: { children: ReactNode }) {
  return <rules>{children}</rules>
}

// Input and reference components

export function Input({ children }: { children: ReactNode }) {
  return <input>{children}</input>
}

export function Reference({ children }: { children: ReactNode }) {
  return <reference>{children}</reference>
}

export function Source({ children }: { children: ReactNode }) {
  return <source>{children}</source>
}

export function Citation({ children }: { children: ReactNode }) {
  return <citation>{children}</citation>
}

// Task and goal components

export function Task({ children }: { children: ReactNode }) {
  return <task>{children}</task>
}

export function Goal({ children }: { children: ReactNode }) {
  return <goal>{children}</goal>
}

export function Objective({ children }: { children: ReactNode }) {
  return <objective>{children}</objective>
}

// Error and validation components

export function Error({ children }: { children: ReactNode }) {
  return <error>{children}</error>
}

export function Warning({ children }: { children: ReactNode }) {
  return <warning>{children}</warning>
}

export function Validation({ children }: { children: ReactNode }) {
  return <validation>{children}</validation>
}

// Metadata components

export function Metadata({ children }: { children: ReactNode }) {
  return <metadata>{children}</metadata>
}

export function Tags({ children }: { children: ReactNode }) {
  return <tags>{children}</tags>
}

export function Categories({ children }: { children: ReactNode }) {
  return <categories>{children}</categories>
}

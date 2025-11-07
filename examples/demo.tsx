import React from 'react'

import prompt from '../src/index'
import { Code, Context, Data, Instructions, Task } from '../src/index'

console.log('=== Testing React Prompt Kit Components ===\n')

console.log('1. Instructions component:')
const result1 = prompt(
  <Instructions>
    <p>Follow these steps:</p>
    <ul>
      <li>Analyze the data</li>
      <li>Provide recommendations</li>
    </ul>
  </Instructions>
)
console.log(result1)
console.log('\n')

console.log('2. Context component:')
const result2 = prompt(
  <Context>
    <p>You are a financial analyst at AcmeCorp.</p>
  </Context>
)
console.log(result2)
console.log('\n')

console.log('3. Code component with language:')
const result3 = prompt(<Code language="typescript">const x = 1;</Code>)
console.log(result3)
console.log('\n')

console.log('4. Complex example with multiple components:')
const result4 = prompt(
  <>
    <Context>
      <p>You are a data analyst.</p>
    </Context>
    <Task>
      <p>Analyze the following data:</p>
    </Task>
    <Data>Revenue: $15.2M, Costs: $8.1M</Data>
    <Instructions>
      <ol>
        <li>Calculate profit margin</li>
        <li>Identify trends</li>
        <li>Provide recommendations</li>
      </ol>
    </Instructions>
  </>
)
console.log(result4)

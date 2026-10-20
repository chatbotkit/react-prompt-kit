// @note React 19's types dropped the global `JSX` namespace; intrinsic
// elements are augmented on `React.JSX`, which React 18 types expose too.
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // @note allow any custom element (e.g., <task>, <context>, etc.)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [elemName: string]: any
    }
  }
}

export { default, prompt } from './prompt'

export * from './components'

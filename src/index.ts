declare global {
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

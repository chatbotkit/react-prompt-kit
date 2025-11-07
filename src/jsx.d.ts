// @note TypeScript declarations for custom JSX elements - this allows us to use
// custom elements without type errors

// @note this augments the global JSX namespace to allow any custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // @note allow any custom element (e.g., <task>, <context>, etc.)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [elemName: string]: any
    }
  }
}

// @note this export makes this file a module, which is required for declare global
export {}

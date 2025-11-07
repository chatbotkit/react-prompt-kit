// @note typeScript declarations for custom JSX elements - this allows us to use
// custom elements in tests without type errors

declare namespace JSX {
  interface IntrinsicElements {
    // @note allow any custom element for testing purposes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [elemName: string]: any
  }
}

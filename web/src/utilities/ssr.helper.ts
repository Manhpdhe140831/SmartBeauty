/**
 * NextJS does not have the "router" at the initial load (SSR)
 * therefore, we need to wait until the window object is available.
 * @param thenDo
 * @param ifNotReturn
 */
export function waitForWindow<T = unknown>(
  thenDo: () => T,
  ifNotReturn: unknown = null
) {
  if (typeof window !== "undefined") {
    return thenDo() as T;
  }

  return ifNotReturn as T;
}

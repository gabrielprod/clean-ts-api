// if a throw has no typing, the typing is never
export const throwError = (): never => {
  throw new Error()
}

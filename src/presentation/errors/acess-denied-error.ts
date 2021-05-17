export class AccessDeniedError extends Error {
  constructor () {
    super('Acess Denied')
    this.name = 'AcessDeniedError'
  }
}

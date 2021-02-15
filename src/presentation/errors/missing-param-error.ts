export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing Param ${paramName}`)
    this.name = 'MissingParamError'
  }
}

// Classe pai  = Error;
// propriedade name é de Error e so pode usar ela depois do metodo super

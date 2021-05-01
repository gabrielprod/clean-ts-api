import { Validation } from '../../presentation/protocols/validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]

  // irá ser feita todas as validações a partir desse componente
  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error {
    for (const validation of this.validations) {
      const err = validation.validate(input)
      if (err) {
        return err
      }
    }
  }
}

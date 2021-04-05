import { InvalidParamError, MissingParamError } from '../../errors/index'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Validation } from '../../helpers/validators/validation'
import { AddAccount, Controller, EmailValidator, HttpRequest, HttpResponse } from './signup-protocols' // protocolos genéricos

// classe nao pode herdar lguma tipagem, classe herda somente outra classe, por isso o uso do implements pois tal classe esta herdando certo tipo
// ou melhor dizendo implementando
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (emailValidator: EmailValidator, addAccount: AddAccount, validation: Validation) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, password, passwordConfirmation, email } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}

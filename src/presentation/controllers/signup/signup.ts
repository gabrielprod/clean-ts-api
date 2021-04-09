import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
import { AddAccount, Controller, HttpRequest, HttpResponse } from './signup-protocols' // protocolos genéricos

// classe nao pode herdar lguma tipagem, classe herda somente outra classe, por isso o uso do implements pois tal classe esta herdando certo tipo
// ou melhor dizendo implementando
export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  // dependecy injection
  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, password, email } = httpRequest.body

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

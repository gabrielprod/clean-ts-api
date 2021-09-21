import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, Controller, HttpRequest, HttpResponse } from './signup-controller-protocols' // protocolos genéricos
import { Authentication } from '@/domain/usecases/account/authentication'
import { EmailInUseError } from '@/presentation/errors'

// classe nao pode herdar lguma tipagem, classe herda somente outra classe, por isso o uso do implements pois tal classe esta herdando certo tipo
// ou melhor dizendo implementando
export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  private readonly authentication: Authentication
  // dependecy injection
  constructor (addAccount: AddAccount, validation: Validation, authentication: Authentication) {
    this.addAccount = addAccount
    this.validation = validation
    this.authentication = authentication
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

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}

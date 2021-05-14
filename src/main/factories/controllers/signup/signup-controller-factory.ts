import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeAddAccount } from '../../usecases/add-account/add-account-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeAddAccount(), makeSignUpValidation(), makeDbAuthentication())
}

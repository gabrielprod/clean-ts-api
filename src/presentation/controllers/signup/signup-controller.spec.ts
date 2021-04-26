import { MissingParamError, ServerError } from '../../errors/index'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { HttpRequest } from '../../protocols/index'
import { SignUpController } from './signup-controller'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { AccountModel, AddAccount, AddAccountModel, Validation } from './signup-controller-protocols'

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    // Retornamos um erro nesse metodo pois se ocorrer tudo certo com a validacao nao queremos fazer nada, mas caso der erro devemos retornar esse erro!
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new AuthenticationStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@gmail.com',
  password: 'valid_password'
})

// Para retornarmos um objeto de maneira direta devemos colocar parenteses antes das chaves
const makeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  // class mock que retorna um valor fake por isso a terminacao Stub
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('Signup Controller', () => {
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    // spyOn -> Basicamente passamos um objeto como parametro nesse método e o mesmo ira analisar/espionar o comportamento da função
    // retornando assim valores passados no metodo mockReturnValueOnce

    await sut.handle(makeHttpRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    // spyOn -> Basicamente passamos um objeto como parametro nesse método e o mesmo ira analisar/espionar o comportamento da função
    // retornando assim valores passados no metodo mockReturnValueOnce

    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(makeHttpRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any@mail.com',
      password: 'any_password'
    })
  })
})

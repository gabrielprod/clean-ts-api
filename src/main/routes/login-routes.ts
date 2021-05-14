import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'
import { makeLogControllerDecorator } from '../factories/decorators/log-controller-decarator'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeLogControllerDecorator(makeSignUpController())))
  router.post('/login', adaptRoute(makeLogControllerDecorator(makeLoginController())))
}

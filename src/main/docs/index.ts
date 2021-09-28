import {} from './'
import { badRequest } from './components/bad-request'
import { notFound } from './components/not-found'
import { serverError } from './components/server-error'
import { unauthorized } from './components/unauthorized'
import { loginPath } from './paths/login-paths'
import { accountSchema } from './schemas/account-schema'
import { errorSchema } from './schemas/error-schema'
import { loginParamsSchema } from './schemas/login-params-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API do curso de clean-architecture para realizar enquetes entre programadores',
    version: '1.0.0'
  },
  license: {
    name: 'ISC',
    url: 'https://opensource.org/licenses/ISC '
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}

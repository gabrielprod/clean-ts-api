import { adaptMiddleware } from '../../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from './auth-middleware-factory'

export const auth = adaptMiddleware(makeAuthMiddleware())

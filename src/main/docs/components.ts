import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
} from './components/index'

import { apiKeyAuthSchema } from './schemas/index'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
}

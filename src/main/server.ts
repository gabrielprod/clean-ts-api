import 'module-alias/register'
import { mongoHelper } from '../infra/db/mongodb/helper/mongo-helper'
import env from './config/env'

mongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => {
      console.log('Server Running !')
    })
  }).catch(err => {
    console.log(err)
  })

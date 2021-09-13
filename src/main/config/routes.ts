import { Express, Router } from 'express'
import path from 'path'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  // fg.sync('**/src/main/routes/**routes.ts').map(async file => (await import(`../../../${file}`)).default(router))
  readdirSync(path.join(__dirname, '/../routes')).map(async file => {
    if (!file.includes('.test.') && !file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}

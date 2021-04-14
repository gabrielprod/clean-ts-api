import request from 'supertest'
import app from '../config/app'
import { mongoHelper } from '../../infra/db/mongodb/helper/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'gabriel',
          email: 'gabriel.pr07@hotmail.com',
          password: 'pererinha.12',
          passwordConfirmation: 'pererinha.12'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const pass = await hash('pererinha.12', 12)
      await accountCollection.insertOne({
        name: 'gabriel',
        email: 'gabriel.pr07@hotmail.com',
        password: pass
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'gabriel.pr07@hotmail.com',
          password: 'pererinha.12'
        })
        .expect(200)
    })
  })
})

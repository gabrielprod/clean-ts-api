import request from 'supertest'
import app from '../config/app'
import { mongoHelper } from '../../infra/db/mongodb/helper/mongo-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success ', async () => {
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

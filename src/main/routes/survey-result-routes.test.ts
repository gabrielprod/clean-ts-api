import { mongoHelper } from '@/infra/db/mongodb/helper/mongo-helper'
import request from 'supertest'
import app from '../config/app'

describe('Survey Routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  describe('PUT /surveys/:surveyId/result', () => {
    test('Should return 403 save survey without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})

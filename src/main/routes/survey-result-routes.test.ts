import request from 'supertest'
import app from '../config/app'
import { mongoHelper } from '@/infra/db/mongodb/helper/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeAcessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'gabrielprod',
    email: 'gabriel.pr@hotmail.com',
    password: '123'
  })

  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await mongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
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

    test('Should return 200 on save survey result with accessToken', async () => {
      const accessToken = await makeAcessToken()
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          answer: 'any_answer',
          image: 'http://image-name.com'
        }, {
          answer: 'any_answer2'
        }],
        date: new Date()
      })
      await request(app)
        .put(`/api/surveys/${res.ops[0]._id as string}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer'
        })
        .expect(200)
    })
  })
})

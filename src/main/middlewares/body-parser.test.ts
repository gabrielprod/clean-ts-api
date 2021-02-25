import request from 'supertest'
import app from '../config/app'

describe('Body Parser', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser').send({ name: 'Gabriel' }).expect({ name: 'Gabriel' })
  })
})

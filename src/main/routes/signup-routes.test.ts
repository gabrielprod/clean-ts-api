import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
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

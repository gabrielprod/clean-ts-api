import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  private readonly secret: string
  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    await jwt.sign({ id: 'any_id' }, this.secret)
    return null
  }
}

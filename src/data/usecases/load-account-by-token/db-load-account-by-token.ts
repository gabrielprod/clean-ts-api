import { LoadAccountByToken } from "../../../domain/usecases/load-account-by-token";
import { Decrypter } from "../../protocols/criptography/decrypter";
import { AccountModel } from "../authentication/db-authentication-protocols";

export class DbLoadAccountByToken implements LoadAccountByToken{
  private readonly decrypter: Decrypter

  constructor(decrypter: Decrypter) {
    this.decrypter = decrypter
  }

  async load (accessToken: string, role?:string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
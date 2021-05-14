import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { mongoHelper } from '../helper/mongo-helper'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const accountD = result.ops[0]
    return mongoHelper.map(accountD)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    if (account) {
      return mongoHelper.map(account)
    }
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}

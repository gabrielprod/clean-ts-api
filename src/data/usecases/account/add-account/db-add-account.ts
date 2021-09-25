import {
  AccountModel,
  AddAccount,
  AddAccountParams,
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepo: AddAccountRepository
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  constructor (
    hasher: Hasher,
    addAccountRepo: AddAccountRepository,
    loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {
    this.hasher = hasher
    this.addAccountRepo = addAccountRepo
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountByEmail = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!accountByEmail) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const account = await this.addAccountRepo.add(Object.assign({}, accountData, { password: hashedPassword }))
      return Promise.resolve(account)
    }
    return null
  }
}

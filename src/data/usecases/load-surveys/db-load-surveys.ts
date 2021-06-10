import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveys } from '../../../domain/usecases/load-surveys'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'

export class DbLoadSurveys implements LoadSurveys {
  private readonly loadSurveysRepository: LoadSurveysRepository

  constructor (loadSurveysRepository: LoadSurveysRepository) {
    this.loadSurveysRepository = loadSurveysRepository
  }

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.loadAll()
    return null
  }
}

import {
  LoadSurveyByIdRepository,
  SurveyModel
} from './db-load-survey-by-id-protocols'

export class DbLoadSurveyById implements LoadSurveyByIdRepository {
  private readonly loadSurveysRepository: LoadSurveyByIdRepository

  constructor (loadSurveyByIdRepository: LoadSurveyByIdRepository) {
    this.loadSurveysRepository = loadSurveyByIdRepository
  }

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveysRepository.loadById(id)
    return survey
  }
}

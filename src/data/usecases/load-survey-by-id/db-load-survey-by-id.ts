import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-surveys-by-id'
import { SurveyModel } from '@/domain/models/survey'

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

import {
  LoadSurveyById,
  Controller,
  HttpRequest,
  HttpResponse
} from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  private readonly loadSurveyById: LoadSurveyById

  constructor (loadSurveyById: LoadSurveyById) {
    this.loadSurveyById = loadSurveyById
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return null
  }
}

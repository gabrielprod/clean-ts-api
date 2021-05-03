import { Validation } from '../../../protocols'
import { Controller, HttpRequest, HttpResponse } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  private readonly validation: Validation

  constructor (validation: Validation) {
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(null))
  }
}

import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decarator'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}

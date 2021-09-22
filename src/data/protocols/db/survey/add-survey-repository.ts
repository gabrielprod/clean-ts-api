import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export interface AddSurveyRepository{
  add: (accountData: AddSurveyParams) => Promise<void>
}

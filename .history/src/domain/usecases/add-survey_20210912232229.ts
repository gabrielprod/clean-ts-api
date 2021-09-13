import { SurveyAnswerModel } from '../models/survey'

export type AddSurveyModel = {
  question: string
  answers: SurveyAnswerModel[]
  createdAt: Date
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}

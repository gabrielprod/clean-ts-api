import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResult } from '@/domain/test'
import { SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult())
    }
  }

  return new SaveSurveyResultStub()
}

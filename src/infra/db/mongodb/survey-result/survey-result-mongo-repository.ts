import { SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { mongoHelper } from '../helper/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await mongoHelper.getCollection('surveyResults')
    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
    // if no search data is found, create a new record with the search data
      upsert: true,
      returnOriginal: false
    })
    return res.value && mongoHelper.map(res.value)
  }
}

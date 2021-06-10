import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    createdAt: new Date()
  }, {
    id: 'another_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    createdAt: new Date()
  }]
}

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
      async loadAll (): Promise<SurveyModel[]> {
        return new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }

    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })
})

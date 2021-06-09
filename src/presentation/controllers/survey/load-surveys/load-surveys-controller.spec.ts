import { LoadSurveys, SurveyModel, LoadSurveysController} from './load-surveys-controller-protocols'
import mockdate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    createdAt: new Date()
  },{
    id: 'another_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    createdAt: new Date()
  }]
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Should call LoadSurveys', async () => {
    class LoadSurveysStub implements LoadSurveys {
      async load (): Promise<SurveyModel[]> {
        return new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }

    const loadSurveysStub = new LoadSurveysStub()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const sut = new LoadSurveysController(loadSurveysStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
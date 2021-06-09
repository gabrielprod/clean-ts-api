import { LoadSurveys } from "../../../../domain/usecases/load-surveys";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "./load-surveys-controller-protocols";

export class LoadSurveysController implements Controller{
  private readonly loadSurveys: LoadSurveys

  constructor(loadSurveys: LoadSurveys) {
    this.loadSurveys = loadSurveys
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try{
      const surveys = await this.loadSurveys.load() 
      return ok(surveys)
    } catch (err) {
      return serverError(err)
    }

  } 
}
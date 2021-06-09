import { LoadSurveys } from "../../../../domain/usecases/load-surveys";
import { ok } from "../../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "./load-surveys-controller-protocols";

export class LoadSurveysController implements Controller{
  private readonly loadSurveys: LoadSurveys

  constructor(loadSurveys: LoadSurveys) {
    this.loadSurveys = loadSurveys
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load() 
    return ok(surveys)
  } 
}
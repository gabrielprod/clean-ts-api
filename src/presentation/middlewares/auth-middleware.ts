import { AccessDeniedError } from "../errors";
import { forbidden } from "../helpers/http/http-helper";
import { HttpRequest, HttpResponse, Middleware } from "../protocols";

export class AuthMiddleware implements Middleware {
  private readonly loadAccountByToken
  constructor(loadAccountByToken) {
    this.loadAccountByToken = loadAccountByToken
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    return forbidden(new AccessDeniedError())
  }
}
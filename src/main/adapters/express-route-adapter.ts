import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, RequestHandler, Response } from 'express'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    // funcao que receberá o controller e retornara uma funcao de requisição e resposta que tera como resposta o metodo
    // responsavel por lidar com todo controller
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

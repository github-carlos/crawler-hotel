import { RoomController } from '@application/controller';
import { Request, Response, Router } from 'express';

export class RoomRouter {

  constructor(private roomController: RoomController) {}

  routes(): Router {
    const router = Router()

    router.post('/', async (req: Request, res: Response) => {
      const input = req.body
      const result = await this.roomController.search(input)
      const response = !result.error ? result.data : {error: result.error}
      return res.status(result.status).json(response)
    })

    return router
  }
}
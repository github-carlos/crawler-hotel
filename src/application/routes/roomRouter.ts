import { RoomController } from "@application/controller";
import { Request, Response, Router } from "express";

export class RoomRouter {

  constructor(private roomController: RoomController) {}

  routes(): Router {
    const router = Router()

    router.post('/search', async (req: Request, res: Response) => {
      const input = req.body
      const response = await this.roomController.search(input)
      return res.status(response.status).json({data: response.data, error: response.error})
    })

    return router
  }
}
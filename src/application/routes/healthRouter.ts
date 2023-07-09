import { RoomController } from '@application/controller'
import { addDays } from 'date-fns'
import { Router, Request, Response } from 'express'

export class HealthRouter {

  constructor(private roomController: RoomController) {}

  routes(): Router {
    const router = Router()

    router.get('/', async (req: Request, res: Response) => {
      const input = { checkIn: addDays(new Date(), 5).toISOString(), checkOut: addDays(new Date(), 10).toISOString() }
      const result = await this.roomController.search(input)

      if (result.error) {
        return res.status(result.status).json({error: result.error})
      }

      const rooms = result.data
      // validar resposta
      if (!(rooms instanceof Array)) {
        return res.status(500).json({error: 'Crawler not given array of elements'})
      }

      const errors: string[] = []
      const priceRegex = /^R\$ \d{1,3}(?:\.\d{3})*(?:,\d{2})$/;
      for (const room of rooms) {
        if (!room.name) {
          errors.push('Missing room name')
        }
        if (!room.description) {
          errors.push('Missing description')
        }
        if (!room.image) {
          errors.push('Missing image')
        }

        // if price is empty or does not satisfy R$ XXXX,00
        if (!room.price || !priceRegex.test(room.price)) {
          errors.push('Price is empty or does not satisfy pattern')
        }
      }

      if (errors.length > 0) {
        return res.status(500).json({errors})
      }

      return res.status(200).json({message: 'Everything looks good :)'})
    })

    return router
  }
}
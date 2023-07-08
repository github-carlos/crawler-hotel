import { Room } from "@domain/entity";
import { BusinessError } from "@domain/error/errors.interface";
import { SearchAvailableRooms, SearchAvailableRoomsInputDto, SearchAvailableRoomsInterface, SearchAvailableRoomsOutputDto } from "@domain/usecase";
import { UseCase } from "@domain/usecase/usecase.interface";
import { Debugger, debug } from "debug";

export class RoomController {

  private debug: Debugger
  constructor(private searchAvailableRoomUseCase: SearchAvailableRoomsInterface) {
    this.debug = debug('Server::' + RoomController.name)
  }

  async search(input: {checkIn: Date, checkOut: Date, numAdults?: number, numChildren?: number}): Promise<{data?: Array<Room>, status: number, error?: string}> {
    this.debug('Searching Rooms...')
    try {
      const result = await this.searchAvailableRoomUseCase.run({...input})
      return { data: result.rooms,  status: 200, error: undefined }
    } catch(err) {
      if (err instanceof BusinessError) {
        return {data: null, status: 400, error: err.message}
      }
      return { data: null, status: 500, error: 'Internal error' }
    }
  }
}
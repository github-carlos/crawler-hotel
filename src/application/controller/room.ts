import { Room } from '@domain/entity';
import { BusinessError } from '@domain/error/errors.interface';
import {  SearchAvailableRoomsInterface } from '@domain/usecase';
import { Debugger, debug } from 'debug';
import { SearchRoomSchema } from './schemas/searchRoom';
import { ZodError } from 'zod';

export class RoomController {

  private debug: Debugger
  constructor(private searchAvailableRoomUseCase: SearchAvailableRoomsInterface) {
    this.debug = debug('Server::' + RoomController.name)
  }

  async search(input: {checkIn: string, checkOut: string, numberOfAdults?: number, numberOfChildren?: number}): Promise<{data?: Array<Room>, status: number, error?: unknown}> {
    this.debug('Searching Rooms...')
    try {
      const checkIn = input.checkIn ? new Date(input.checkIn) : undefined
      const checkOut = input.checkOut ? new Date(input.checkOut) : undefined
      SearchRoomSchema.parse({...input, checkIn, checkOut})

      const result = await this.searchAvailableRoomUseCase.run({...input, checkIn, checkOut})

      return { data: result.rooms,  status: 200, error: undefined }
    } catch(err) {
      if (err instanceof BusinessError) {
        return {data: null, status: 400, error: err.message}
      }

      if (err instanceof ZodError) {
        const errorMessage = err.flatten().fieldErrors
        return {data: null, status: 400, error: errorMessage }
      }

      return { data: null, status: 500, error: 'Internal error' }
    }
  }
}
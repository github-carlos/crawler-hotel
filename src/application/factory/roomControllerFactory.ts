import { RoomController } from '@application/controller';
import { SearchAvailableRooms } from '@domain/usecase';
import { PuppeteerRoomsService } from '@infra/services/puppeteerRoomsService';

let roomController: RoomController

export function roomControllerFactory(): RoomController {
  if (!roomController) {
    const roomsService = PuppeteerRoomsService.instance
    const searchAvailableRoomsUseCase = new SearchAvailableRooms(roomsService)
    roomController = new RoomController(searchAvailableRoomsUseCase)
  }
  return roomController
}
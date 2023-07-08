import { RoomController } from '@application/controller';
import { RoomRouter } from '@application/routes';
import { SearchAvailableRooms } from '@domain/usecase';
import { PuppeteerRoomsService } from '@infra/services/puppeteerRoomsService';

export function roomRouterFactory(): RoomRouter {
  const roomsService = PuppeteerRoomsService.instance
  const searchAvailableRoomsUseCase = new SearchAvailableRooms(roomsService)
  const roomController = new RoomController(searchAvailableRoomsUseCase)
  const roomRouter = new RoomRouter(roomController)
  return roomRouter
}
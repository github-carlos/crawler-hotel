import { RoomRouter } from '@application/routes';
import { roomControllerFactory } from './roomControllerFactory';

export function roomRouterFactory(): RoomRouter {
  const roomController = roomControllerFactory()
  const roomRouter = new RoomRouter(roomController)
  return roomRouter
}
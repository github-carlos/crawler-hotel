import { HealthRouter } from '@application/routes';
import { roomControllerFactory } from './roomControllerFactory';

export function healthRouterFactory(): HealthRouter {
  const roomController = roomControllerFactory()
  const healthRouter = new HealthRouter(roomController)
  return healthRouter
}
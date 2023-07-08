import { Room } from "@domain/entity";

export interface RoomsServiceInterface {
  getAvailableRooms(): Promise<Array<Room>>
}
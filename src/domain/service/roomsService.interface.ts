import { Room } from '@domain/entity';
import { RoomSearch } from '@domain/entity/RoomSearch';

export interface RoomsServiceInterface {
  getAvailableRooms(roomSearch: RoomSearch): Promise<Array<Room>>
}
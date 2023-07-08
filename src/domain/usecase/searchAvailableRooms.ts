import { Room } from "@domain/entity";
import { RoomsServiceInterface } from "@domain/service";
import { UseCase } from "./usecase.interface";
import { debug, Debugger } from "debug";
import { RoomSearch } from "@domain/entity/RoomSearch";

export type SearchAvailableRoomsInputDto = {
  checkIn: Date
  checkOut: Date
  numberOfAdults?: number
  numberOfChildren?: number
}

export type SearchAvailableRoomsOutputDto = {
  rooms: Array<Room>
}

export interface SearchAvailableRoomsInterface extends UseCase<SearchAvailableRoomsInputDto, Promise<SearchAvailableRoomsOutputDto>> {}

export class SearchAvailableRooms implements SearchAvailableRoomsInterface {

  private debug: Debugger

  constructor(private roomsService: RoomsServiceInterface) {
    this.debug = debug('Server::' + SearchAvailableRooms.name)
  }

  async run(input: SearchAvailableRoomsInputDto): Promise<SearchAvailableRoomsOutputDto> {
    this.debug(`Searching for Rooms: checkin ${input.checkIn} :: checkout ${input.checkOut}`)

    const roomSearch = new RoomSearch({...input})
    const rooms = await this.roomsService.getAvailableRooms(roomSearch)
    
    this.debug(`Finished Search. Found ${rooms.length} rooms available`)
    return { rooms }
  }
}
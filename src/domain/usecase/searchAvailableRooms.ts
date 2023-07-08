import { Room } from "@domain/entity";
import { RoomsServiceInterface } from "@domain/service";
import { UseCase } from "./usecase.interface";

export type SearchAvailableRoomsInputDto = {
  checkIn: Date
  checkOut: Date
  numberOfAdults?: number
  numberOfChildren?: number
}

export type SearchAvailableRoomsOutputDto = {
  rooms: Array<Room>
}

export class SearchAvailableRooms implements UseCase<SearchAvailableRoomsInputDto, Promise<SearchAvailableRoomsOutputDto>> {

  constructor(private roomsService: RoomsServiceInterface) {}

  async run(input: SearchAvailableRoomsInputDto): Promise<SearchAvailableRoomsOutputDto> {



    return null
  }
}
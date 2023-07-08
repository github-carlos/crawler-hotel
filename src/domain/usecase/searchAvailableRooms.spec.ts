import { Room } from '@domain/entity'
import { SearchAvailableRooms, SearchAvailableRoomsInputDto } from './searchAvailableRooms'
import { addDays } from 'date-fns'
import { RoomSearch } from '@domain/entity/RoomSearch'

describe('#SearchAvailableRooms', () => {

  const roomsFixture: Array<Room> = [ {name: 'Room 1', description: 'Description Room', price: 'R$ 100,00', image: 'image.com'} ]
  const input: SearchAvailableRoomsInputDto = { checkIn: addDays(new Date(), 1), checkOut: addDays(new Date(), 5) }

  describe('success', () => {

    test('should return available rooms with success', async () => {
      const roomServiceMock = { getAvailableRooms: jest.fn().mockResolvedValueOnce(roomsFixture) }
      const usecase = new SearchAvailableRooms(roomServiceMock)
      const availableRooms = await usecase.run(input)

      expect(availableRooms.rooms).not.toBeUndefined()
      expect(availableRooms.rooms).toBeInstanceOf(Array)
      expect(availableRooms.rooms.length).toBe(1)
      expect(availableRooms.rooms[0]).toStrictEqual(roomsFixture[0])
      expect(roomServiceMock.getAvailableRooms).toBeCalledWith(new RoomSearch({...input}))
    })
  })
})
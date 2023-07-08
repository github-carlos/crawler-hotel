import { Room } from "@domain/entity"
import { RoomController } from "./room"
import { addDays } from "date-fns"
import { SearchAvailableRoomsOutputDto } from "@domain/usecase"
import { InvalidCheckInDateError } from "@domain/error"

describe("#RoomController", () => {

  const input = { checkIn: addDays(new Date(), 2), checkOut: addDays(new Date(), 5) }

  const rooms = [new Room({name: 'R1', description: 'description', image: 'image.com', price: '1050'})]
  const searchUseCaseMock = { run: jest.fn() }
  const controller = new RoomController(searchUseCaseMock)

  describe("success", () => {
    test("should return rooms with correct data", async () => {
      searchUseCaseMock.run.mockResolvedValueOnce({ rooms } as SearchAvailableRoomsOutputDto)
      const response = await controller.search(input)
      expect(response.data).toBeInstanceOf(Array)
      expect(response.data.length).toBe(1)
      expect(response.status).toBe(200)
      expect(searchUseCaseMock.run).toBeCalledWith(input)
    })
  })
  describe("fail", () => {
    test("should return error with 400 when invalid data", async () => {
      searchUseCaseMock.run.mockRejectedValueOnce(new InvalidCheckInDateError())
      const response = await controller.search(input)
      expect(response.data).toBeNull()
      expect(response.status).toBe(400)
      expect(response.error).toBe((new InvalidCheckInDateError()).message)
    })
    test("should return error with 500 when not business error", async () => {
      searchUseCaseMock.run.mockRejectedValueOnce(new Error('some error'))
      const response = await controller.search(input)
      expect(response.data).toBeNull()
      expect(response.status).toBe(500)
      expect(response.error).toBe('Internal error')
    })
  })
})
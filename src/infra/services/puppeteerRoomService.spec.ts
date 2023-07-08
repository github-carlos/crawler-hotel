import { RoomSearch } from "@domain/entity/RoomSearch"
import { PuppeteerRoomsService } from "./puppeteerRoomsService"
import { addDays } from "date-fns"
import { Room } from "@domain/entity"

const rooms = [{ name: 'R1', description: 'Description', price: 'R$ 50', image: "image.com" }]
const evaluate = jest.fn().mockResolvedValue(rooms)
const goto = jest.fn().mockResolvedValue(null)
const closeBrowser = jest.fn().mockResolvedValue(null)
const closePage = jest.fn().mockResolvedValue(null)
const newPage = jest.fn().mockResolvedValue({
  goto,
  evaluate,
  close: closePage
})
const launchMock = jest.fn().mockResolvedValue({
  newPage,
  close: closeBrowser
})

jest.mock('puppeteer', () => {
  return {
    launch: (...args) => {
      return launchMock(...args)
    }
  }
})

describe("PuppeteerRoomService Unit test", () => {

  let puppeteerService: PuppeteerRoomsService

  beforeAll(async () => {
    process.env.HOTEL_SITE_URL = "https://pratagy.letsbook.com.br/D/Reserva"
    puppeteerService = PuppeteerRoomsService.instance
    await puppeteerService.getBrowser()
  })

  afterAll(async () => {
    await puppeteerService.closeBrowser()
  })

  const roomSearch = new RoomSearch({ checkIn: addDays(new Date(), 5), checkOut: addDays(new Date(), 10) })
  test("should go to web page and get rooms with success", async () => {
    const availableRooms = await puppeteerService.getAvailableRooms(roomSearch)

    expect(launchMock).toBeCalledWith({headless: 'new'})
    expect(goto).toBeCalledWith(expect.any(String), { waitUntil: "networkidle0" })
    expect(closePage).toBeCalledTimes(1)
    expect(evaluate).toBeCalledTimes(1)

    expect(availableRooms).toBeInstanceOf(Array)

    for (const room of availableRooms) {
      expect(room).toBeInstanceOf(Room)
      expect(room.name).toBeDefined()
      expect(room.name.length).toBeGreaterThan(0)
      expect(room.description).toBeDefined()
      expect(room.description.length).toBeGreaterThan(0)
      expect(room.price).toBeDefined()
      expect(room.price.length).toBeGreaterThan(0)
      expect(room.image).toBeDefined()
      expect(room.image.length).toBeGreaterThan(0)
    }
  })
})
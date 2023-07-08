import { RoomSearch } from "@domain/entity/RoomSearch"
import { PuppeteerRoomsService } from "./puppeteerRoomsService"
import { addDays } from "date-fns"

describe("#PuppeteerRoomService E2E test", () => {

  let puppeteerService: PuppeteerRoomsService

  beforeAll(async () => {
    process.env.HOTEL_SITE_URL = "https://pratagy.letsbook.com.br/D/Reserva"
    process.env.CHROME_PATH_MAC_M1="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    puppeteerService = PuppeteerRoomsService.instance
    await puppeteerService.getBrowser()
  })

  afterAll(async() => {
    await puppeteerService.closeBrowser()
  })

  const roomSearch = new RoomSearch({ checkIn: addDays(new Date(), 5), checkOut: addDays(new Date(), 10) })
  test("should go to web page and get rooms with success", async () => {
    const availableRooms = await puppeteerService.getAvailableRooms(roomSearch)

    expect(availableRooms).toBeInstanceOf(Array)

    if (availableRooms.length > 0) {
      for (const room of availableRooms) {
        expect(room.name).toBeDefined()
        expect(room.name.length).toBeGreaterThan(0)
        expect(room.description).toBeDefined()
        expect(room.description.length).toBeGreaterThan(0)
        expect(room.price).toBeDefined()
        expect(room.price.length).toBeGreaterThan(0)
        expect(room.image).toBeDefined()
        expect(room.image.length).toBeGreaterThan(0)
      }
    }

  }, 30000)
})
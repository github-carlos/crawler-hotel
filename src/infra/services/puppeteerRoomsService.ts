import { Room } from '@domain/entity';
import { RoomSearch } from '@domain/entity/RoomSearch';
import { RoomsServiceInterface } from '@domain/service';
import { format } from 'date-fns';
import { Debugger, debug } from 'debug';
import * as puppeteer from 'puppeteer';

type ExtratedRooms = Array<{
  name: string
  description: string
  price: string
  image: string
}>

export class PuppeteerRoomsService implements RoomsServiceInterface {

  private debug: Debugger
  private browser?: puppeteer.Browser

  private constructor() {
    this.debug = debug('Server::' + PuppeteerRoomsService.name)
  }

  private static _instance: PuppeteerRoomsService;
  static get instance(): PuppeteerRoomsService {
    if (!PuppeteerRoomsService._instance) {
      PuppeteerRoomsService._instance = new PuppeteerRoomsService()
    }
    return PuppeteerRoomsService._instance
  }

  async getAvailableRooms(roomSearch: RoomSearch): Promise<Room[]> {
    this.debug('Getting Rooms with Puppeteer Service...')
    const browser = await this.getBrowser()
    const page = await browser.newPage()

    await page.goto(this.buildUrl(roomSearch), { waitUntil: 'networkidle0' })

    const extractedRooms = await this.extractRooms(page)
    await page.close()
    this.debug(`Fround ${extractedRooms.length} available Rooms`)
    return extractedRooms.map((extractedRoom) => new Room({ ...extractedRoom }))
  }

  async getBrowser(): Promise<puppeteer.Browser> {
    this.debug('Getting Browser...')
    if (!this.browser) {
      this.debug('Launching new Browser...')
      this.browser = await puppeteer.launch({
        headless: 'new',
        executablePath: process.env.CHROME_PATH_MAC_M1
      })
    }
    return this.browser
  }

  private buildUrl(roomSearch: RoomSearch): string {
    const encodedCheckin = encodeURIComponent(format(roomSearch.checkIn, 'dd/MM/yyyy'))
    const encodedCheckout = encodeURIComponent(format(roomSearch.checkOut, 'dd/MM/yyyy'))
    const encodedMonthYear = encodeURIComponent(format(roomSearch.checkIn, 'MM/yyyy'))
    return `${process.env.HOTEL_SITE_URL}?`
      + `checkin=${encodedCheckin}&`
      + `checkout=${encodedCheckout}&`
      + 'cidade=&hotel=12&'
      + `adultos=${roomSearch.numberOfAdults}&`
      + `criancas=${roomSearch.numberOfChildren}&`
      + 'destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&'
      + `mesCalendario=${encodedMonthYear}`
  }

  private async extractRooms(page: puppeteer.Page): Promise<ExtratedRooms> {
    return page.evaluate(() => {
      const rooms: ExtratedRooms = []
      const trRooms = document.querySelectorAll('.row-quarto')
      trRooms.forEach((trRoom: Element) => {
        const name = trRoom.querySelector('.quartoNome').textContent
        const description = trRoom.querySelector('.quartoDescricao > p').textContent
        const image = trRoom.querySelector('.room--image').getAttribute('data-src')
        const price = `R$ ${trRoom.querySelector('.valorFinal').childNodes[1].textContent.trim()}00`
        rooms.push({ name, description, image, price })
      })
      return rooms
    })
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close()
      this.browser = undefined
    }
  }
}
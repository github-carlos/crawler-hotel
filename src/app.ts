import { roomRouterFactory } from "@application/factory";
import { PuppeteerRoomsService } from "@infra/services/puppeteerRoomsService";
import { Debugger, debug } from "debug";
import express from "express";
import { Server } from "http";

export class CrawlerApp {
  private debug: Debugger

  private app: express.Application
  private server: Server

  constructor() {
    this.debug = debug('Server::' + CrawlerApp.name)
    this.app = express()
  }

  async start(port: string) {
    this.debug('...Starting Application...')
    try {
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true}))

      const roomRouter = roomRouterFactory()
      this.app.use('/search', roomRouter.routes())

      this.app.use(function (req, res, next) {
        return res.status(404).send('Route not found')
      });

      this.server = this.app.listen(port, () => {
        this.debug("App Crawler running on PORT " + port)
      })
    } catch(err) {
      this.debug('Failed to start server::' + err)
      await this.close()
      process.exit(1)
    }
  }

  async close() {
    this.debug("Closing Application...")
    if (PuppeteerRoomsService.instance) {
      await PuppeteerRoomsService.instance.closeBrowser()
    }

    if (this.server) {
      this.server.close(() => {
        this.debug('Application closed')
      })
    }
  }
}
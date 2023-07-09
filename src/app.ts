import { healthRouterFactory, roomRouterFactory } from '@application/factory';
import { PuppeteerRoomsService } from '@infra/services/puppeteerRoomsService';
import { Debugger, debug } from 'debug';
import express from 'express';
import { Server } from 'http';
import expressWinston from 'express-winston'
import winston from 'winston';

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

      this.addRequestLogger()

      const roomRouter = roomRouterFactory()
      const healthRouter = healthRouterFactory()

      // setup routes
      this.app.use('/search', roomRouter.routes())
      this.app.use('/health', healthRouter.routes())

      this.app.use(function (_, res) {
        return res.status(404).send('Route not found')
      });

      this.addRequestErrorLogger()

      this.server = this.app.listen(port, () => {
        this.debug('App Crawler running on PORT ' + port)
      })
    } catch(err) {
      this.debug('Failed to start server::' + err)
      await this.close()
      process.exit(1)
    }
  }

  private addRequestLogger() {
     this.app.use(expressWinston.logger({
        transports: [
          new winston.transports.Console()
        ],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        ),
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}}', 
        expressFormat: true,
        colorize: false,
      }));
  }
  private addRequestErrorLogger() {
    this.app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.Console()
      ],
      responseField: '',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      )
    }));
  }

  async close() {
    this.debug('Closing Application...')
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
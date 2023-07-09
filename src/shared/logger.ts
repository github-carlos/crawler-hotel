import winston from 'winston';

class LoggerSingleton {
  
  static instance: LoggerSingleton
  logger: winston.Logger

  constructor() {
    if (!LoggerSingleton.instance) {
      // Defina o formato personalizado para incluir a data e hora
      const logFormat = winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
      });

      // Crie uma instância do logger do Winston
      this.logger = winston.createLogger({
        format: winston.format.combine(
          winston.format.timestamp(), // Adiciona um campo de timestamp à mensagem de log
          logFormat // Usa o formato personalizado definido acima
        ),
        transports: [
          new winston.transports.Console() // Exemplo de transporte para o console, você pode usar outros transportes
        ]
      });

      LoggerSingleton.instance = this;
    }

    return LoggerSingleton.instance;
  }

  getLogger() {
    return this.logger;
  }
}

// Uso do logger singleton
const loggerSingleton = new LoggerSingleton();
export const logger = loggerSingleton.getLogger();
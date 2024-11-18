import winston from 'winston';
const { combine, timestamp, json } = winston.format;
export class Logger {
  private logger: winston.Logger;

  private static instance: Logger;
  private constructor() {
    this.logger = winston.createLogger({
      level: 'http',
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        json(),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  public static getLoggerInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public static getLogger(): winston.Logger {
    let _logger = Logger.getLoggerInstance();
    return _logger.logger;
  }
}

export type WinstonLogger = winston.Logger; // Exporting the type

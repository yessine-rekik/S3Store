import winston from 'winston';
import LokiTransport from 'winston-loki';

const logger = winston.createLogger({
  level: 'info',

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    // new LokiTransport({
    //   host:'http://localhost:3100',
    //   json:true,
    //   labels:{service: 'auth'},
    //   format: winston.format.combine(
    //     winston.format.timestamp(),
    //     winston.format.json(),
    //   )
    // }),

    new winston.transports.File({
      filename: 'logs.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export default logger;

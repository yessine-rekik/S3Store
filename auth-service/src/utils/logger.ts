import winston from 'winston';
import 'dotenv/config';

// import LokiTransport from 'winston-loki';

const logger = winston.createLogger({
  level: 'info',

  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
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
  ],
});

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
  logger.add(
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;

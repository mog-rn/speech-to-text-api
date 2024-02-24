import pino from 'pino';

export const logger = pino({
    redact: ["DATABASE_CONNECTION"],
    // levels: {
    //     error: 0,
    //     warn: 1,
    //     info: 2,
    //     debug: 3,
    // },
    // level: env.LOG_LEVEL,
    transport: {

        target: 'pino-pretty',
        options: {
            // colorize: true,
            ignore: 'pid,hostname',
        },
    }
});
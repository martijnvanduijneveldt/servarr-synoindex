
import { createLogger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { format } from 'logform';


const transport: DailyRotateFile = new DailyRotateFile({
    filename: 'logs/servarr-synoindex-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const myFormat = format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

const _logger = createLogger({
    format: format.combine(
        format.timestamp(),
        myFormat
    ),
    transports: [transport]
});

export const logger = _logger;

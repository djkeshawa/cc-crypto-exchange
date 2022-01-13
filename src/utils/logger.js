const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, label, printf } = format;
const customLogFormat = printf(info => {
  return JSON.stringify({
    time: info.timestamp,
    env: info.label,
    level: info.level,
    message: info.message,
    charCount: info.message.length
  });
});

const env = process.env.ENVIRONMENT || 'LOCAL';

const logger = createLogger({
  format: combine(label({ label: env }), timestamp(), customLogFormat),
  transports: [new transports.Console()]
});

module.exports = logger;

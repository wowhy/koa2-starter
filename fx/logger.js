const log4js = require('log4js')

log4js.configure({
  appenders: {
    dateFile: {
      type: 'dateFile',
      filename: './logs/trace.log',
      pattern: 'yyyy-MM-dd-hh',
      compress: true
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['dateFile', 'out'], level: 'trace' }
  }
})

const logger = log4js.getLogger()

if (process.env.NODE_ENV === 'development') {
  logger.level = 'debug'
}

module.exports = logger

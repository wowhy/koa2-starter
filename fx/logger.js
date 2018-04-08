const log4js = require('log4js')
const logger = log4js.getLogger()

if (process.env.NODE_ENV === 'development') {
  logger.level = 'debug'
}

module.exports = logger

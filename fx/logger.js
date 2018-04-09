const log4js = require('log4js')

log4js.configure({
  appenders: {
    trace: {
      type: 'dateFile',
      filename: './logs/trace',
      pattern: '.yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      compress: false
    },
    error: {
      type: 'dateFile',
      filename: './logs/error',
      pattern: '.yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      compress: false
    },
    execute: {
      type: 'dateFile',
      filename: './logs/execute',
      pattern: '.yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      compress: false
    },
    console: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['console'], level: 'trace' },
    trace: { appenders: ['trace', 'console'], level: 'trace' },
    error: { appenders: ['error', 'console'], level: 'error' },
    execute: { appenders: ['execute', 'console'], level: 'trace' }
  }
})

const traceLogger = log4js.getLogger('trace')
const errorLogger = log4js.getLogger('error')
const executeLogger = log4js.getLogger('execute')

module.exports = {
  info(message, ...args) {
    traceLogger.info(`[PID = ${process.pid}]`, message, ...args)
  },
  error(message, ...args) {
    errorLogger.error(`[PID = ${process.pid}]`, message, ...args)
  },
  trace(message, ...args) {
    traceLogger.trace(`[PID = ${process.pid}]`, message, ...args)
  },
  debug(message, ...args) {
    traceLogger.debug(`[PID = ${process.pid}]`, message, ...args)
  },
  execute(message, ...args) {
    executeLogger.trace(`[PID = ${process.pid}]`, message, ...args)
  }
}

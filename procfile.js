'use strict'

module.exports = pandora => {
  const config = require('./config')

  pandora.process('koa2-starter').scale(1)

  pandora
    .service('KoaServer', './index')
    .config(require('./config'))
    .process('koa2-starter')
}

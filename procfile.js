'use strict'

module.exports = pandora => {
  const config = require('./config')

  pandora.process('koa2-starter').scale(1)

  pandora
    .service('KoaServer', './index')
    .config(require('./config'))
    .process('koa2-starter')

  // pandora.fork('koa2-starter.git', './index.js')

  /**
   * you can also use cluster mode to start application
   */
  // pandora
  //   .cluster('./index.js');

  /**
   * you can create another process here
   */
  // pandora
  //   .process('background')
  //   .nodeArgs(['--expose-gc']);

  /**
   * more features please visit our document.
   * https://github.com/midwayjs/pandora/
   */
}

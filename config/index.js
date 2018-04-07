const fs = require('fs')
const path = require('path')
const merge = require('merge')

module.exports = function(ctx) {
  let config = {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    secrets: ['qwe123,./'],
    session: {
      maxAge: 30 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000
    },
    static: {
      maxAge: 60 * 60
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: ''
    },
    database: {
      host: 'localhost',
      port: '5432',
      dbname: 'demo',
      user: 'postgres',
      password: 'hongyuan'
    },
    oauth: {
      secret: 'qwe123,./',
      grants: ['password', 'refreshToken'],
      database: {
        host: 'localhost',
        port: '5432',
        dbname: 'demo',
        user: 'postgres',
        password: 'hongyuan'
      }
    }
  }

  let configPath = path.resolve(__dirname, './')
  let extend = JSON.parse(fs.readFileSync(path.join(configPath, process.env.NODE_ENV + '.json')).toString())

  return merge(config, extend)
}

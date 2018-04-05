import Sequelize, { QueryTypes, DataTypes, Op, fn } from 'sequelize'

const db = {
  QueryTypes,
  DataTypes,
  Op,
  fn,
  query: function() {
    throw new Error('initialize failed')
  }
}

db.init = function init(config) {
  let sequelize = new Sequelize(config.dbname, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

  db.query = sequelize.query.bind(sequelize)

  // import Models
  ;['./blog', './post'].forEach(path => sequelize.import(path))
  Object.keys(sequelize.models).forEach(modelName => {
    db[modelName] = sequelize.models[modelName]
  })
  Object.keys(sequelize.models).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  // 初始化数据库
  sequelize.sync()
}

module.exports = db

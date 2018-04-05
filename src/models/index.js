import Sequelize, { QueryTypes, DataTypes, Op, fn, col } from 'sequelize'

const OperatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
}

const db = {
  QueryTypes,
  DataTypes,
  Op,
  OperatorsAliases,
  fn,
  col,
  query: function() {
    throw new Error('initialize failed')
  }
}

db.init = function init(config) {
  let sequelize = new Sequelize(config.dbname, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'postgres',
    operatorsAliases: OperatorsAliases,
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
  return sequelize.sync()
}

module.exports = db

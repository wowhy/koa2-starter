import { resolver } from 'graphql-sequelize'
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize'

export default function paginationResolver(model, config) {
  const findAndCountAll = findOptions => {
    return model.findAndCountAll(findOptions).then(res => ({ total: res.count, items: res.rows }))
  }

  config.list = true
  config.dataLoader = true

  return resolver(
    {
      primaryKeyAttribute: model.primaryKeyAttribute,
      rawAttributes: model.rawAttributes,
      findAll: findAndCountAll,
      findOne: findAndCountAll,
      findAndCountAll,
      getTableName: model.getTableName.bind(model),
      associationType: model.associationType,
      target: {
        findAll: findAndCountAll,
        findOne: findAndCountAll,
        findAndCountAll
      }
    },
    config
  )
}
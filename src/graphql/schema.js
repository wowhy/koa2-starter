import { buildSchema, GraphQLString } from 'graphql'
import SequelizeJSON from '../../fx/graphql/SequelizeJSON'

import blogTypes from './blog/types'
import postTypes from './post/types'

import blogQuery from './blog/query'
import postQuery from './post/query'

import blogMutation from './blog/mutation'

GraphQLString.serialize = function coerceString(value) {
  if (Array.isArray(value)) {
    throw new TypeError('String cannot represent an array value: [' + String(value) + ']')
  }
  if (Object.prototype.toString.call(value) === '[object Date]') return value.toISOString()
  return String(value)
}

const schema = buildSchema(`
  interface Entity {
    id: String
    createdAt: String
    updatedAt: String
  }

  scalar SequelizeJSON

  ${blogTypes}
  ${postTypes}

  type Query {
    ${blogQuery}
    ${postQuery}
  }

  type Mutation {
    ${blogMutation}
  }
`)

export default schema

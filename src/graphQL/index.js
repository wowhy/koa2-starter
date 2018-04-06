import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'

import blogQuery from './blog/query'
import postQuery from './post/query'

import blogMutation from './blog/mutations'

GraphQLString.serialize = function coerceString(value) {
  if (Array.isArray(value)) {
    throw new TypeError('String cannot represent an array value: [' + String(value) + ']')
  }
  if (Object.prototype.toString.call(value) === '[object Date]') return value.toISOString()
  return String(value)
}

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...blogQuery,
      ...postQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      ...blogMutation
    }
  })
})

export default schema

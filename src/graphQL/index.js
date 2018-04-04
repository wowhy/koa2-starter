import { GraphQLSchema, GraphQLObjectType } from 'graphql'

import hello from './hello/query'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...hello
    }
  })
})

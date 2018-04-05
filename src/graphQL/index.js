import { GraphQLSchema, GraphQLObjectType } from 'graphql'

import blog from './blog/query'
import post from './post/query'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...blog,
      ...post
    }
  })
})

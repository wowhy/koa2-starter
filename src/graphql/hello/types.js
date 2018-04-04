import { GraphQLString, GraphQLObjectType } from 'graphql'

export const HelloWorldType = new GraphQLObjectType({
  name: 'HelloWorldType',
  fields: () => ({
    hello: {
      type: GraphQLString
    }
  })
})

import { GraphQLList, GraphQLObjectType, GraphQLInt } from 'graphql'

export default function paginationTyper(type) {
  return new GraphQLObjectType({
    name: type.name + 'Pager',
    fields: {
      total: {
        type: GraphQLInt,
        description: 'total count'
      },
      items: {
        type: new GraphQLList(type),
        description: 'items'
      }
    }
  })
}

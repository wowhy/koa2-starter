import { GraphQLObjectType, GraphQLList } from 'graphql'
import { attributeFields, resolver } from 'graphql-sequelize'
import { Blog, Post } from '../../models'

export const PostListType = new GraphQLObjectType({
  name: 'PostListType',
  fields: {
    ...attributeFields(Post, {})
  }
})

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    ...attributeFields(Post, {}),
    blog: {
      type: new GraphQLObjectType({
        name: 'PostPostsType',
        fields: attributeFields(Blog, {})
      }),
      resolve: resolver(Post.Blog)
    }
  }
})

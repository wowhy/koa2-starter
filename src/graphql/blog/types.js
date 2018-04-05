import { GraphQLObjectType, GraphQLList } from 'graphql'
import { attributeFields, resolver } from 'graphql-sequelize'
import { Blog, Post } from '../../models'

export const BlogListType = new GraphQLObjectType({
  name: 'BlogListType',
  fields: {
    ...attributeFields(Blog, {})
  }
})

export const BlogType = new GraphQLObjectType({
  name: 'BlogType',
  fields: {
    ...attributeFields(Blog, {}),
    posts: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'BlogPostsType',
          fields: attributeFields(Post, {})
        })
      ),
      resolve: resolver(Blog.Posts)
    }
  }
})

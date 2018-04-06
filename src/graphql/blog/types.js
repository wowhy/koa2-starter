import { GraphQLObjectType, GraphQLList, GraphQLInputObjectType } from 'graphql'
import { attributeFields, resolver, defaultListArgs } from 'graphql-sequelize'
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
      args: defaultListArgs(),
      resolve: resolver(Blog.Posts)
    }
  }
})

export const BlogInputType = new GraphQLInputObjectType({
  name: 'BlogInputType',
  fields: attributeFields(Blog, {
    exclude: ['id', 'createdAt', 'updatedAt']
  })
})

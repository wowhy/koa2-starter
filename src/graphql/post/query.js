import { GraphQLList } from 'graphql'
import { resolver, defaultArgs, defaultListArgs } from 'graphql-sequelize'
import { Post } from '../../models'
import { PostListType, PostType } from './types'

export default {
  post: {
    type: PostType,
    args: defaultArgs(Post),
    resolve: resolver(Post, {})
  },
  posts: {
    type: new GraphQLList(PostListType),
    args: defaultListArgs(Post),
    resolve: resolver(Post, {
      list: true
    })
  }
}

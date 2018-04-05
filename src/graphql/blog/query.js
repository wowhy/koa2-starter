import { GraphQLList } from 'graphql'
import { resolver, defaultArgs, defaultListArgs } from 'graphql-sequelize'
import { Blog } from '../../models'
import { BlogListType, BlogType } from './types'

export default {
  blog: {
    type: BlogType,
    args: defaultArgs(Blog),
    resolve: resolver(Blog, {})
  },
  blogs: {
    type: new GraphQLList(BlogListType),
    args: defaultListArgs(Blog),
    resolve: resolver(Blog, {
      list: true
    })
  }
}

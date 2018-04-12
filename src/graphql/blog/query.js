import { GraphQLList } from 'graphql'
import { argsToFindOptions, defaultArgs, defaultListArgs } from 'graphql-sequelize'

import paginationTyper from '../../../fx/graphql/paginationTyper'

import { Blog, Post } from '../../models'
import { BlogListType, BlogType } from './types'

import { blog as proxy } from '../../proxy'

const fields = Object.keys(Blog.rawAttributes)

export default {
  blog: {
    type: BlogType,
    args: defaultArgs(Blog),
    resolve: (source, args, context, info) => {
      return proxy.findOne(argsToFindOptions.default(args, fields), context.user)
    }
  },
  blogs: {
    type: paginationTyper(BlogListType),
    args: defaultListArgs(Blog),
    resolve: (source, args, context, info) => {
      return proxy.pagination(argsToFindOptions.default(args, fields), context.user)
    }
  }
}

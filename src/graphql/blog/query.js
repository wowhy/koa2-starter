import { GraphQLList } from 'graphql'
import { defaultArgs, defaultListArgs } from 'graphql-sequelize'
import argsToFindOptions from '../../utils/argsToFindOptions'

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
      return proxy.findOne(argsToFindOptions(args, fields), context.user)
    }
  },
  blogs: {
    type: paginationTyper(BlogListType),
    args: defaultListArgs(Blog),
    resolve: (source, args, context, info) => {
      return proxy.pagination(argsToFindOptions(args, fields), context.user)
    }
  }
}

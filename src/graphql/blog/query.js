import { GraphQLList } from 'graphql'
import { resolver, defaultArgs, defaultListArgs } from 'graphql-sequelize'

import { paginationTyper, paginationResolver } from '../../../fx/graphql/paginationResolver'

import { Blog, Post } from '../../models'
import { BlogListType, BlogType } from './types'

export default {
  blog: {
    type: BlogType,
    args: defaultArgs(Blog),
    resolve: resolver(Blog, {})
  },
  blogs: {
    type: paginationTyper(BlogListType),
    args: defaultListArgs(Blog),
    resolve: paginationResolver(Blog, {
      list: true,
      before: (findOptions, args, context, document) => {
        // findOptions.include = ['posts']
        return findOptions
      },
      after: (result, args, context) => {
        return result
      }
    })
  }
}

import { resolver } from 'graphql-sequelize'

import { graphqlValidate } from '../../../fx/validation/graphqlValidate'

import { BlogType, BlogInputType } from './types'
import { blog as proxy } from '../../proxy'
import { createBlogRule } from './rules'

export default {
  createBlog: {
    type: BlogType,
    args: {
      input: {
        type: BlogInputType
      }
    },
    resolve: graphqlValidate(createBlogRule, async (source, args, context, info) => {
      return proxy.create(args.input, context)
    })
  }
}

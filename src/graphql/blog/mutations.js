import { resolver } from 'graphql-sequelize'

import { Blog } from '../../models'
import { BlogType, BlogInputType } from './types'
import proxy from '../../proxy/blog'

export default {
  createBlog: {
    type: BlogType,
    args: {
      input: {
        type: BlogInputType
      }
    },
    resolve: async (source, args, context, info) => {
      return proxy.create(args.input, context)
    }
  }
}

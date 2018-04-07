import { resolver } from 'graphql-sequelize'

import { BlogType, BlogInputType } from './types'
import proxy from '../../proxy/blog'
import authenticate from '../../middlewares/authenticate'

export default {
  createBlog: {
    type: BlogType,
    args: {
      input: {
        type: BlogInputType
      }
    },
    resolve: async (source, args, context, info) => {
      await authenticate(context)
      return proxy.create(args.input, context)
    }
  }
}

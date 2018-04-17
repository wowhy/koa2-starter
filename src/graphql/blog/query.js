import argsToFindOptions from '../../utils/argsToFindOptions'

import { Blog, Post } from '../../models'
import { blog as proxy } from '../../proxy'

const fields = Object.keys(Blog.rawAttributes)

export default `
  blog(id: String, where: SequelizeJSON): Blog
  blogs(offset: Int, limit: Int, where: SequelizeJSON, order: String): BlogPageResult
`

export const resolver = {
  blog(args, context) {
    return proxy.findOne(argsToFindOptions(args, fields), context.user)
  },
  blogs(args, context) {
    return proxy.pagination(argsToFindOptions(args, fields), context.user)
  }
}

import argsToFindOptions from '../../../fx/utils/argsToFindOptions'

import { Blog, Post } from '../../models'
import { post as proxy } from '../../proxy'

const fields = Object.keys(Post.rawAttributes)

export default `
  post(id: String, where: SequelizeJSON): Blog
  posts(offset: Int, limit: Int, where: SequelizeJSON, order: String): PostPageResult
`

export const resolver = {
  post(args, context) {
    return proxy.findOne(argsToFindOptions(args, fields), context.user)
  },
  posts(args, context) {
    return proxy.pagination(argsToFindOptions(args, fields), context.user)
  }
}

import { Post } from '../models'

export default {
  findOne(options, user) {
    return Post.findOne(options)
  },
  pagination(options, user) {
    return Post.findAndCountAll(options).then(raw => ({ total: raw.count, items: raw.rows }))
  }
}

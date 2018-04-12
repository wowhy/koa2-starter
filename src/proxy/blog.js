import uuid from 'uuid'

import { Blog } from '../models'
import { createBlogRule, secretBlogRule } from './rules'

export default {
  create(input, user) {
    return createBlogRule.process(input, user, async () => {
      let entity = Blog.build(input)
      entity.id = uuid.v4()
      await entity.save()
      return entity
    })
  },
  findOne(options, user) {
    return Blog.findOne(options)
  },
  pagination(options, user) {
    return secretBlogRule.process(options, user, () => {
      return Blog.findAndCountAll(options).then(raw => ({ total: raw.count, items: raw.rows }))
    })
  }
}

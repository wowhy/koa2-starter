import { Blog } from '../models'

export default {
  find(where, orderBy) {
    return Blog.findAll({
      where,
      order: orderBy
    })
  },
  pagination(page, limit, where, orderBy) {
    return Blog.findAll({
      offset: (page - 1) * limit,
      limit,
      where,
      order: orderBy
    })
  },
  getById(id) {
    return Blog.findAll({
      limit: 1,
      where: {
        id
      }
    }).then(raw => raw[0] || null)
  },
  create(blog) {},
  update(blog) {},
  remove(blog) {}
}

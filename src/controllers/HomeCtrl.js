import uuid from 'uuid'

import Blog from '../proxy/blog'

export default class HomeCtrl {
  async index(ctx) {
    console.log(await Blog.getById(uuid.v4()))
    ctx.body = 'blogs count: ' + (await Blog.find()).length
  }

  async error404(ctx) {
    ctx.body = '404'
  }
}

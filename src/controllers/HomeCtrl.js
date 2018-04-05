import uuid from 'uuid'

export default class HomeCtrl {
  async index(ctx) {
    ctx.body = 'Hello, World!'
  }

  async error404(ctx) {
    ctx.body = '404 not found'
  }
}

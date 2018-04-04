export default class HomeCtrl {
  async index(ctx) {
    ctx.body = 'hello, world'
  }

  async error404(ctx) {
    ctx.body = '404'
  }
}

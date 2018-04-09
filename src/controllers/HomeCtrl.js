import uuid from 'uuid'

export default class HomeCtrl {
  async index(ctx) {
    console.log(await ctx.user.isAuthenticated())
    ctx.body = { date: new Date() }
  }

  async error404(ctx) {
    ctx.body = '404 not found'
  }
}

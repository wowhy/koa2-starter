export default async function(ctx, next) {
  await ctx.app.oauth.authenticate()(ctx, next)
  // console.log(ctx.state.oauth.token)
}

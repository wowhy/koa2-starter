export default function(ctx, next) {
  return ctx.app.oauth.authenticate()(ctx, next)
}

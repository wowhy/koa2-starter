const OAuthError = require('oauth2-server/lib/errors/oauth-error')

export default async function authenticate(ctx, next) {
  await ctx.app.oauth.authenticate()(ctx, next)
}

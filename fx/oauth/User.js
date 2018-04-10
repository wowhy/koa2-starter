const logger = require('../logger'),
  OAuthServer = require('oauth2-server'),
  Request = OAuthServer.Request,
  Response = OAuthServer.Response

class User {
  constructor(context, oauthServer) {
    this.context = context
    this.oauthServer = oauthServer
  }

  get state() {
    return this.context.state
  }

  get oauth() {
    if (!this.state.oauth) {
      this.state.oauth = {}
    }

    return this.state.oauth
  }

  get token() {
    return this.oauth.token
  }

  get value() {
    return this.oauth.token.user
  }

  async isAuthenticated() {
    if (this.oauth.authenticated === undefined) {
      await this.authenticate()
    }

    return this.oauth.authenticated
  }

  async authenticate() {
    try {
      let request = new Request(this.context.request),
        response = new Response(this.context.response)
      let token = await this.oauthServer.server.authenticate(request, response)
      this.oauth.token = token
      this.oauth.authenticated = true
    } catch (ex) {
      if (!ex.code) {
        throw ex
      }

      logger.error(ex)

      this.oauth.authenticated = false
    }

    return false
  }
}

User.build = authServer =>
  function(ctx, next) {
    ctx.user = new User(ctx, authServer)
    return next()
  }

module.exports = User

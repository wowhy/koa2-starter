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

  async isAuthenticated() {
    if (this.oauth.authenticated === undefined) {
      await this.authenticate()
    }

    return this.oauth.authenticated
  }

  async authenticate() {
    try {
      let token = await this.oauthServer.server.authenticate(this.context.request, this.context.response)
      this.oauth.token = token
      this.oauth.authenticated = true
    } catch (ex) {
      if (!ex.code) {
        throw ex
      }

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

export default User

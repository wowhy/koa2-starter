'use strict'

const logger = require('../logger'),
  OAuthServer = require('oauth2-server'),
  Request = OAuthServer.Request,
  Response = OAuthServer.Response

const ePath = 'oauth2-server/lib/errors/',
  OAuthError = require(ePath + 'oauth-error'),
  InvalidScopeError = require(ePath + 'invalid-scope-error'),
  InvalidArgumentError = require(ePath + 'invalid-argument-error'),
  UnauthorizedRequestError = require(ePath + 'unauthorized-request-error')

function build(ctx) {
  if (!ctx.state.oauth) {
    ctx.state.oauth = {}
  }

  const request = new Request(ctx.request),
    response = new Response(ctx.response)
  return {
    request,
    response
  }
}

class KoaOAuthServer {
  constructor(options) {
    this.options = options || {}

    if (!options.model) {
      throw new InvalidArgumentError('Missing parameter: `model`')
    }

    // If no `saveTokenMetadata` method is set via the model, we create
    // a simple passthrough mechanism instead
    this.saveTokenMetadata = options.model.saveTokenMetadata
      ? options.model.saveTokenMetadata
      : (token, data) => {
          return Promise.resolve(token)
        }

    // If no `checkScope` method is set via the model, we provide a default
    this.checkScope = options.model.checkScope
      ? options.model.checkScope
      : (scope, token) => {
          return token.scope.indexOf(scope) !== -1
        }

    this.server = new OAuthServer(options)
  }

  // Returns token authentication middleware
  authenticate() {
    logger.debug('Creating authentication endpoint middleware')
    return async (ctx, next) => {
      logger.debug('Running authenticate endpoint middleware')
      const { request, response } = build(ctx)

      await this.server
        .authenticate(request, response)
        .then(async token => {
          ctx.state.oauth.token = token
          ctx.state.oauth.authenticated = true
          if (next) await next()
        })
        .catch(err => {
          ctx.state.authenticated = false
          handleError(err, ctx)
        })
    }
  }

  // Returns authorization endpoint middleware
  // Used by the client to obtain authorization from the resource owner
  authorize(options) {
    logger.debug('Creating authorization endpoint middleware')
    return async (ctx, next) => {
      logger.debug('Running authorize endpoint middleware')
      const { request, response } = build(ctx)

      await this.server
        .authorize(request, response, options)
        .then(async code => {
          ctx.state.oauth.code = code
          handleResponse(ctx, response)
          if (next) await next()
        })
        .catch(err => {
          handleError(err, ctx)
        })
    }
  }

  // Returns token endpoint middleware
  // Used by the client to exchange authorization grant for access token
  token() {
    logger.debug('Creating token endpoint middleware')
    return async (ctx, next) => {
      logger.debug('Running token endpoint middleware')
      const { request, response } = build(ctx)

      await this.server
        .token(request, response)
        .then(token => {
          return this.saveTokenMetadata(token, ctx.request)
        })
        .then(async token => {
          ctx.state.oauth.token = token
          ctx.state.oauth.authenticated = true
          handleResponse(ctx, response)
          if (next) await next()
        })
        .catch(err => {
          handleError(err, ctx)
        })
    }
  }

  // Returns scope check middleware
  // Used to limit access to a route or router to carriers of a certain scope.
  scope(required) {
    logger.debug(`Creating scope check middleware (${required})`)
    return (ctx, next) => {
      const result = this.checkScope(required, ctx.state.oauth.token)
      if (result !== true) {
        const err = result === false ? `Required scope: \`${required}\`` : result

        handleError(new InvalidScopeError(err), ctx)
        return
      }

      return next()
    }
  }
}

function handleResponse(ctx, response) {
  logger.debug(`Preparing success response (${response.status})`)
  ctx.set(response.headers)
  ctx.status = response.status
  ctx.body = response.body
}

// Add custom headers to the context, then propagate error upwards
function handleError(err, ctx) {
  logger.error(`Preparing error response (${err.code || 500})`)

  const response = new Response(ctx.response)
  ctx.set(response.headers)

  ctx.status = err.code || 500
  throw err
}

// Expose error classes
KoaOAuthServer.OAuthError = OAuthError
KoaOAuthServer.InvalidScopeError = InvalidScopeError
KoaOAuthServer.InvalidArgumentError = InvalidArgumentError
KoaOAuthServer.UnauthorizedRequestError = UnauthorizedRequestError

module.exports = KoaOAuthServer

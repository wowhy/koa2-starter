import { Op, fn } from 'sequelize'
import jwt from 'jsonwebtoken'
import uuid from 'uuid'

import db from './db'

export default function(config) {
  const { OAuthClient, OAuthToken, OAuthUser } = db(config)
  return {
    generateAccessToken(client, user, scope) {
      return jwt.sign(
        {
          sub: user.id,
          username: user.username,
          scope: scope,
          client_id: client.clientId
        },
        config.secret,
        {
          expiresIn: config.accessTokenLifetime
        }
      )
    },
    getClient(clientId, clientSecret) {
      let where = {
        clientId
      }
      if (clientSecret) {
        where.clientSecret = clientSecret
      }
      return OAuthClient.findOne({
        where
      }).then(raw => (raw ? raw.dataValues : null))
    },
    getUser(username, password) {
      return OAuthUser.findOne({
        where: {
          username,
          password
        }
      }).then(raw => (raw ? raw.dataValues : null))
    },
    async saveToken(token, client, user) {
      let data = {
        id: uuid.v4(),
        scope: token.scope,
        clientId: client.clientId,
        userId: user.id,
        accessToken: 'jwt token',
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt
      }
      await OAuthToken.create(data)
      return {
        ...token,
        client,
        user
      }
    },
    validateScope(user, client, scope) {
      if (!scope) {
        return 'offline_access'
      }
      return scope
    },
    async getRefreshToken(refreshToken) {
      let data = await OAuthToken.findOne({
        where: {
          refreshToken
        }
      })
      if (!data) return false

      let client = await OAuthClient.findById(data.clientId)
      let user = await OAuthUser.findById(data.userId, {
        attributes: { exclude: ['password'] }
      })

      if (!client || !user) return false

      return {
        refreshToken: data.refreshToken,
        refreshTokenExpiresAt: data.refreshTokenExpiresAt,
        scope: data.scope,
        client: client.dataValues,
        user: user.dataValues
      }
    },
    async getAccessToken(accessToken) {
      let data = jwt.decode(accessToken)
      if (!data) return false

      let client = await OAuthClient.findById(data.client_id)
      let user = await OAuthUser.findById(data.sub, {
        attributes: { exclude: ['password'] }
      })

      if (!client || !user) return false

      return {
        accessToken: accessToken,
        accessTokenExpiresAt: new Date(data.exp * 1000),
        scope: data.scope,
        client: client.dataValues,
        user: user.dataValues
      }
    },
    async revokeToken(token) {
      OAuthToken.destroy({
        where: {
          refreshToken: token.refreshToken
        }
      })
    }
  }
}

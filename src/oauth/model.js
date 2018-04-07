import Sequelize, { DataTypes } from 'sequelize'
import uuid from 'uuid'

export default function model(config) {
  let db = new Sequelize(config.dbname, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

  const OAuthToken = db.define('OAuthToken', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accessTokenExpiresAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refreshTokenExpiresAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  })
  const OAuthClient = db.define('OAuthClient', {
    clientId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false
    },
    redirectUris: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    },
    grants: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    }
  })
  const User = db.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  db.sync()

  return {
    generateAccessToken(client, user, scope) {
      return uuid.v4()
    },
    generateRefreshToken(client, user, scope) {
      return uuid.v4()
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
      return User.findOne({
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
        accessToken: token.accessToken,
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
      return true
    }
  }
}

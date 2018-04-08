export default function(db, DataTypes) {
  db.define('OAuthToken', {
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
      type: DataTypes.DATE,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refreshTokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })
}

export default function(db, DataTypes) {
  db.define('OAuthClient', {
    clientId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false
    },
    redirectUris: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    grants: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  })
}

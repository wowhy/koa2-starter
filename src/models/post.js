export default function(db, DataTypes) {
  db.define('Post', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }).associate = function({ Blog, Post }) {
    Post.belongsTo(Blog, {
      foreignKey: 'blogId'
    })
  }
}

export default function(db, DataTypes) {
  db.define('Blog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }).associate = function({ Blog, Post }) {
    console.log(Blog, Post)
    Blog.hasMany(Post, {
      foreignKey: 'blogId'
    })
  }
}

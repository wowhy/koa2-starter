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
    Blog.Posts = Blog.hasMany(Post, {
      foreignKey: 'blogId',
      as: 'posts'
    })
  }
}

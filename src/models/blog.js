export default function(db, DataTypes) {
  let Blog = db.define('Blog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  Blog.associate = function({ Blog, Post }) {
    Blog.Posts = Blog.hasMany(Post, {
      foreignKey: 'blogId',
      as: 'posts'
    })
  }

  Blog.prototype.posts = function() {
    return Blog.Posts.target.findAll({
      where: {
        blogId: this.id
      }
    })
  }
}

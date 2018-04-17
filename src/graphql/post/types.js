export default `
  type Post implements Entity {
    id: String
    createdAt: String
    updatedAt: String
    title: String
    content: String
    blog: [Blog]
  }

  type PostPageResult {
    total: Int
    items: [Post]
  }
`

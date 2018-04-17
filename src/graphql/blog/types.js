export default `
  type Blog implements Entity {
    id: String
    createdAt: String
    updatedAt: String
    url: String
    posts: [Post]
  }

  type BlogPageResult {
    total: Int
    items: [Blog]
  }

  input BlogInput {
    url: String
  }
`

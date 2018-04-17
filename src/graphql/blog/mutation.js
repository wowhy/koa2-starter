import { blog as proxy } from '../../proxy'

export default `
  createBlog(input: BlogInput): Blog
`

export const resolver = {
  createBlog({ input }, context) {
    return proxy.create(input, context.user)
  }
}

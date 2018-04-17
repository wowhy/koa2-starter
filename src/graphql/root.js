import { resolver as blogQueryResolver } from './blog/query'
import { resolver as postQueryResolver } from './post/query'

import { resolver as blogMutationResolver } from './blog/mutation'

export default {
  ...blogQueryResolver,
  ...postQueryResolver,

  ...blogMutationResolver
}

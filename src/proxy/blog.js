import uuid from 'uuid'
import { Blog } from '../models'

export default {
  create(input, context) {
    let entity = Blog.build(input)
    entity.id = uuid.v4()
    entity.save()
    return entity
  }
}

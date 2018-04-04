import { HelloWorldType } from './types'

export default {
  hello: {
    type: HelloWorldType,
    description: 'Hello, World!',
    resolve: async (root, args) => {
      return {
        hello: 'world'
      }
    }
  }
}

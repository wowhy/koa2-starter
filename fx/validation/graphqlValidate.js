import logger from '../logger'

export function graphqlValidate(rules, resolver) {
  return async function(source, args, context, info) {
    return await rules.validate(context, args, () => {
      return resolver(source, args, context, info)
    })
  }
}

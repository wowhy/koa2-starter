import { argsToFindOptions } from 'graphql-sequelize'

export default function(args, fields) {
  let options = argsToFindOptions.default(args, fields)
  if (args.order) {
    options.order = args.order.split(',').map(k => k.split(' ').filter(x => !!x))
  }
  return options
}

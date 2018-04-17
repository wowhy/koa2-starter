function replaceKeyDeep(obj, keyMap) {
  return Object.keys(obj).reduce((memo, key) => {
    // determine which key we are going to use
    let targetKey = keyMap[key] ? keyMap[key] : key

    // assign the new value
    memo[targetKey] = obj[key]

    // recurse if an array
    if (Array.isArray(memo[targetKey])) {
      memo[targetKey].forEach((val, idx) => {
        if (Object.prototype.toString.call(val) === '[object Object]') {
          memo[targetKey][idx] = replaceKeyDeep(val, keyMap)
        }
      })
    } else if (Object.prototype.toString.call(memo[targetKey]) === '[object Object]') {
      // recurse if Object
      memo[targetKey] = replaceKeyDeep(memo[targetKey], keyMap)
    }

    // return the modified object
    return memo
  }, {})
}

export default function argsToFindOptions(args, targetAttributes) {
  var result = {}

  if (args) {
    Object.keys(args).forEach(function(key) {
      if (~targetAttributes.indexOf(key)) {
        result.where = result.where || {}
        result.where[key] = args[key]
      }

      if (key === 'limit' && args[key]) {
        result.limit = parseInt(args[key], 10)
      }

      if (key === 'offset' && args[key]) {
        result.offset = parseInt(args[key], 10)
      }

      if (key === 'order' && args[key]) {
        // if (args[key].indexOf('reverse:') === 0) {
        //   result.order = [[args[key].substring(8), 'DESC']];
        // } else {
        //   result.order = [[args[key], 'ASC']];
        // }
        result.order = args.order.split(',').map(k => k.split(' ').filter(x => !!x))
      }

      if (key === 'where' && args[key]) {
        // setup where
        result.where = replaceWhereOperators(args.where)
      }
    })
  }

  return result
}

/**
 * Replace the where arguments object and return the sequelize compatible version.
 * @param where arguments object in GraphQL Safe format meaning no leading "$" chars.
 * @returns {Object}
 */
export function replaceWhereOperators(where) {
  // $eq: Op.eq,
  // $ne: Op.ne,
  // $gte: Op.gte,
  // $gt: Op.gt,
  // $lte: Op.lte,
  // $lt: Op.lt,
  // $not: Op.not,
  // $in: Op.in,
  // $notIn: Op.notIn,
  // $is: Op.is,
  // $like: Op.like,
  // $notLike: Op.notLike,
  // $iLike: Op.iLike,
  // $notILike: Op.notILike,
  // $regexp: Op.regexp,
  // $notRegexp: Op.notRegexp,
  // $iRegexp: Op.iRegexp,
  // $notIRegexp: Op.notIRegexp,
  // $between: Op.between,
  // $notBetween: Op.notBetween,
  // $overlap: Op.overlap,
  // $contains: Op.contains,
  // $contained: Op.contained,
  // $adjacent: Op.adjacent,
  // $strictLeft: Op.strictLeft,
  // $strictRight: Op.strictRight,
  // $noExtendRight: Op.noExtendRight,
  // $noExtendLeft: Op.noExtendLeft,
  // $and: Op.and,
  // $or: Op.or,
  // $any: Op.any,
  // $all: Op.all,
  // $values: Op.values,
  // $col: Op.col

  return replaceKeyDeep(where, {
    and: '$and',
    or: '$or',
    gt: '$gt',
    gte: '$gte',
    lt: '$lt',
    lte: '$lte',
    ne: '$ne',
    between: '$between',
    notBetween: '$notBetween',
    in: '$in',
    notIn: '$notIn',
    notLike: '$notLike',
    iLike: '$iLike',
    notILike: '$notILike',
    like: '$like',
    overlap: '$overlap',
    contains: '$contains',
    contained: '$contained',
    any: '$any',
    col: '$col'
  })
}

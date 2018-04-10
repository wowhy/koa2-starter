import util from 'util'
import promisify from 'promisify-any'

export class Rule {
  constructor(validator) {
    if (!util.isFunction(validator)) throw new Error('validator is not a function')
    this.validator = validator
  }

  validate(context, args, target) {
    return promisify(this.validator, 3).call(this, context, args, target)
  }
}

export class Rules {
  constructor(befores = [], afters = []) {
    this.befores = befores
    this.afters = afters
  }

  before(rule) {
    this.befores.push(rule)
  }

  after(rule) {
    this.afters.push(rule)
  }

  async validate(context, args, callback) {
    for (let i = 0; i < this.befores.length; i++) {
      await this.befores[i].validate(context, args)
    }

    if (callback) {
      let target = await callback()
      for (let i = 0; i < this.afters.length; i++) {
        await this.afters[i].validate(context, args, target)
      }

      return target
    }
  }
}

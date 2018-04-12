import util from 'util'
import promisify from 'promisify-any'

export class Rule {
  constructor(validator) {
    if (!util.isFunction(validator)) throw new Error('validator is not a function')
    this.validator = validator
  }

  validate(args, user, target) {
    return promisify(this.validator, 3).call(this, args, user, target)
  }
}

export class RuleProcessor {
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

  async process(args, user, targetFn) {
    for (let i = 0; i < this.befores.length; i++) {
      await this.befores[i].validate(args, user)
    }

    if (targetFn) {
      let target = await targetFn()
      for (let i = 0; i < this.afters.length; i++) {
        await this.afters[i].validate(args, user, target)
      }

      return target
    }
  }
}

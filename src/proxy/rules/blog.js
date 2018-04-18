import { Rule, RuleProcessor } from '../../../fx/validation/rule'
import authenticateRule from '../../../fx/validation/rules/authenticateRule'

export const createBlogRule = new RuleProcessor([authenticateRule])

export const secretBlogRule = new RuleProcessor(
  [],
  [
    new Rule(async (args, user, target) => {
      if (!await user.isAuthenticated() && target) {
        if (target.url) {
          target.url = '****'
        } else if (target.items && target.items.length > 0) {
          target.items.forEach(item => {
            item.url = '****'
          })
        }
      }
    })
  ]
)

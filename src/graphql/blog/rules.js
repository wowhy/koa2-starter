import { Rule, Rules } from '../../../fx/validation/rule'
import authenticateRule from '../../../fx/validation/rules/authenticateRule'

export const createBlogRule = new Rules([authenticateRule])

export const secretBlogRule = new Rules(
  [],
  [
    new Rule(async (context, args, target) => {
      if (!await context.user.isAuthenticated()) {
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

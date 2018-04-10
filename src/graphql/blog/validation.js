import { Rule, Rules } from '../../../fx/validation/rule'
import authenticateRule from '../../../fx/validation/rules/authenticateRule'

export const createBlogValidation = new Rules([authenticateRule])

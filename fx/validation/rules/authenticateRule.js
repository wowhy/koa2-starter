import HttpError from '../../HttpError'
import { Rule } from '../rule'

export default new Rule(async function(args, user, target) {
  let authenticated = await user.isAuthenticated()
  if (!authenticated) {
    throw new HttpError(
      401,
      'AuthenticateFailed',
      'Unauthorized: Access is denied due to invalid credentials.'
    )
  }
})

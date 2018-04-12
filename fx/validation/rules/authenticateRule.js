import { Rule } from '../rule'

export default new Rule(async function(args, user, target) {
  let authenticated = await user.isAuthenticated()
  if (!authenticated) {
    let error = new Error('Unauthorized: Access is denied due to invalid credentials.')
    error.code = 401
    error.type = 'AuthenticateFailed'
    throw error
  }
})

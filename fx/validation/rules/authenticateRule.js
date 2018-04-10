import { Rule } from '../rule'

export default new Rule(async function(context, args, target) {
  let authenticated = await context.user.isAuthenticated()
  if (!authenticated) {
    context.status = 401
    throw new Error(
      JSON.stringify({
        code: 401,
        type: 'AuthenticateFailed',
        message: 'Unauthorized: Access is denied due to invalid credentials.'
      })
    )
  }
})

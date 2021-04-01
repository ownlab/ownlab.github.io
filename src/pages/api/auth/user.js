import withSession from '../../../lib/session'
import * as Sentry from '@sentry/node'

import { initSentry } from '../../../utils/sentry'

initSentry()


export default withSession(async (req, res) => {
  const user = req.session.get('user')
  try {
    throw new Error('API Test 4')
  } catch (error) {
    Sentry.captureException(error)
  }

  // Flushing before returning is necessary if deploying to Vercel, see
  // https://vercel.com/docs/platform/limits#streaming-responses
  await Sentry.flush(2000);
  if (user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      isLoggedIn: true,
      ...user,
    })
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
})
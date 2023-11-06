import 'module-alias/register'
import 'source-map-support/register'
import client from '@/helpers/client'
import likeLatestCast from '@/helpers/likeLatestCast'

void (async () => {
  const user = await client.fetchCurrentUser()
  console.log(`Logged in as ${user.username}`)
  void likeLatestCast()
  setInterval(() => {
    void likeLatestCast()
  }, 10 * 1000)
})()

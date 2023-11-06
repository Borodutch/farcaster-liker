import client from '@/helpers/client'

let lastCastHash = ''
export default async function () {
  console.log('Fetching the last cast...')
  const recentCastsAsyncGenerator = await client.fetchRecentCasts({
    pageSize: 10,
  })
  const lastCast = await recentCastsAsyncGenerator.next()
  if (!lastCast.value) {
    console.log('No cast found')
    return
  }
  if (lastCast.value.hash === lastCastHash) {
    console.log('Already saw this cast')
    return
  }
  lastCastHash = lastCast.value.hash
  console.log(
    `Last cast: "${lastCast.value.text}", author: "${lastCast.value.author.displayName}"`
  )
  const author = await client.lookupUserByFid(lastCast.value.author.fid)
  if (!author) {
    console.log('Author not found')
    return
  }
  if (author.followerCount < 100) {
    console.log('Not enough followers')
    return
  }
  const timeout = Math.floor(Math.random() * 135) + 15
  console.log(`Setting the timeout to like cast in ${timeout}s...`)
  // Random number between 15 and 150
  setTimeout(async () => {
    if (!lastCast.value) {
      console.log('No cast found')
      return
    }
    console.log(
      `Liking "${lastCast.value.text}" by ${lastCast.value.author.displayName}...`
    )
    await client.reactToCast('like', lastCast.value)
    console.log('Liked!')
  }, timeout * 1000)
}

import { interval, merge } from 'rxjs'
import { map, take } from 'rxjs/operators'

const createTweetSource = (frequency, account, attribute) => {
  return interval(frequency).pipe(
    map((i) => ({
      account,
      timestamp: Date.now(),
      content: `${attribute} Tweet number ${i + 1}`,
    }))
    // take(2)
  )
}

export const tweets = merge(
  createTweetSource(5000, 'AwardsDarwin', 'Facepalm'),
  createTweetSource(3000, 'iamdevloper', 'Expert'),
  createTweetSource(5000, 'CommitStrip', 'Funny')
)

// tweets.subscribe(console.log.bind(console))

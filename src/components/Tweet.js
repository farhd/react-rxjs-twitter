import Store from '../store'

import TweetHeader from './Tweet/Header'
import TweetBody from './Tweet/Body'
import TweetFooter from './Tweet/Footer'

function Tweet(tweet) {
  const { account = '', content = '', timestamp = 0, isLiked = false } = tweet
  const onLiked = () => {
    Store.updateTweet({
      id: tweet.id,
      payload: {
        ...tweet,
        isLiked: !tweet.isLiked,
      },
    })
  }

  return (
    <div
      className={`Tweet border-b border-gray-300 px-3 py-2 pb-3 ${
        isLiked ? 'bg-blue-100' : ''
      }`}
    >
      <TweetHeader accountName={account} date={timestamp} />
      <TweetBody content={content} />
      <TweetFooter onLiked={onLiked} isLiked={isLiked} />
    </div>
  )
}

export default Tweet

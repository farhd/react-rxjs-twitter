import Store from '../store/index'

import FeedFilter from './Feed/Filter'
import Tweet from './Tweet'

function Feed({ tweets = [], likesCount = 0, filter }) {
  const Tweets = () => {
    return tweets.map((item, i) => {
      return <Tweet key={i} {...item} />
    })
  }

  return (
    <div className="Feed flex-grow max-w-2xl border-l border-r">
      <div className="border-b p-2">[Feed]</div>
      <div className="FeedControls border-b flex p-2 justify-between">
        <div className="mx-4">Likes: {likesCount}</div>
        <FeedFilter filter={filter} />
        <div className="mx-4">
          <button
            className="border border-red-400 rounded px-2 text-red-600"
            onClick={() => Store.clearFeed()}
          >
            Clear tweets
          </button>
        </div>
      </div>
      <Tweets />
    </div>
  )
}

export default Feed

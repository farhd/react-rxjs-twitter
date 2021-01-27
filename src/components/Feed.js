import Store from '../store/index'

import Tweet from './Tweet'

function Feed({ values = [] }) {
  const Tweets = () => {
    return values.map((item, i) => {
      return <Tweet key={i} {...item} />
    })
  }

  return (
    <div className="Feed flex-grow max-w-2xl border-l border-r">
      <div className="border-b p-2">[Feed]</div>
      <div className="FeedControls border-b flex p-2 justify-between">
        <div className="mx-4">Likes: 0</div>
        <div className="mx-4">
          <span>Filter: </span>
          <button className="border rounded-tl rounded-bl px-2">all</button>
          <button className="border border-l-0 rounded-tr rounded-br px-2">
            liked
          </button>
        </div>
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

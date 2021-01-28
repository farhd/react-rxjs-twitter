import { Subject } from 'rxjs'

import { tweets as tweetsApi } from '../common/api'
import { filters } from '../common/const'

const subject = new Subject()
const initialState = {
  tweets: {},
  likesCount: 0,
  filter: filters.ALL,
}

let state = initialState

function updateState(newState) {
  state = { ...state, ...newState }
  subject.next(state)
}

const Store = {
  initialState,
  init: () => {
    updateState(initialState)
  },
  subscribe: (setState) => subject.subscribe(setState),
  clearFeed: () => {
    Object.values(state.tweets).forEach((tweet) => clearTimeout(tweet.timerId))
    updateState(initialState)
  },
  updateTweet: ({ id, payload }) => {
    let tweets = { ...state.tweets }
    if (payload === null) {
      delete tweets[id]
    } else {
      tweets = {
        ...tweets,
        [id]: {
          ...state.tweets[id],
          ...payload,
        },
      }
    }
    updateState({
      tweets,
    })
    recountLikes(tweets)
  },
  removeTweet: ({ id }) => {
    Store.updateTweet({ id, payload: null })
  },
  addTweet: (tweet) => {
    const timerId = setInterval(() => {
      Store.removeTweet({ id: tweet.id })
    }, 30000)
    updateState({
      tweets: {
        [tweet.id]: {
          ...tweet,
          timerId,
        },
        ...state.tweets,
      },
    })
  },
  updateLikesCount: (newCount) => {
    updateState({
      likesCount: newCount,
    })
  },
  updateFilter: (newFilter = filters.ALL) => {
    updateState({
      filter: newFilter,
    })
  },
}

function recountLikes(tweets) {
  // recount likes
  const newLikesCount = Object.values(tweets).filter((tweet) => tweet.isLiked)
    .length
  Store.updateLikesCount(newLikesCount)
}

Store.subscribe((newState) => {
  console.log('[Store]', newState)
})

tweetsApi.subscribe((tweet) => {
  console.log('[tweetsApi]', tweet)
  Store.addTweet({
    ...tweet,
    id: Date.now(),
    isLiked: false,
  })
})

export default Store

// const timer = setInterval(() => {
//   console.log('purging old items', feed)
//   const oldSubfeed = [...feed].reverse().filter((item) => {
//     return (Date.now() - item.timestamp) / 1000 > 10
//   })
//   console.log(oldSubfeed)
// }, 5000)

// return () => {
//   subscription.unsubscribe()
//   clearInterval(timer)
// }

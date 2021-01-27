import { Subject } from 'rxjs'

import { tweets as tweetsApi } from '../common/api'

const subject = new Subject()
const initialState = {
  tweets: {},
  likesCount: 0,
  filter: '', // all | liked
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
    updateState(initialState)
  },
  updateTweet: ({ id, payload }) => {
    updateState({
      tweets: {
        ...state.tweets,
        [id]: {
          ...state.tweets[id],
          ...payload,
        },
      },
    })
    recountLikes()
  },
  addTweet: (tweet) => {
    updateState({
      tweets: {
        [tweet.id]: tweet,
        ...state.tweets,
      },
    })
  },
  updateLikesCount: (newCount) => {
    updateState({
      likesCount: newCount,
    })
  },
}

function recountLikes() {
  // recount likes
  const newLikesCount = Object.values(state.tweets).filter(
    (tweet) => tweet.isLiked
  ).length
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

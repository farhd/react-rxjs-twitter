import { Subject } from 'rxjs'

import { tweets, tweets as tweetsApi } from '../common/api'

const subject = new Subject()
const initialState = {
  tweets: {},
  likes: 0,
  filter: '', // all | liked
}

let state = initialState

const Store = {
  initialState,
  init: () => {
    state = { ...initialState }
    subject.next(state)
  },
  subscribe: (setState) => subject.subscribe(setState),
  clearFeed: () => {
    state = { ...initialState }
    subject.next(state)
  },
  updateTweet: ({ id, payload }) => {
    console.log('Store.updateTweet', id, payload)
    state = {
      ...state,
      tweets: {
        ...state.tweets,
        [id]: {
          ...state.tweets[id],
          ...payload,
        },
      },
    }
    subject.next(state)
  },
  addTweet: (tweet) => {
    console.log('Store.addTweet', tweet)
    state = {
      ...state,
      tweets: {
        [tweet.id]: tweet,
        ...state.tweets,
      },
    }
    subject.next(state)
  },
}

export default Store

const tweetsApiSub = tweetsApi.subscribe((tweet) => {
  console.log('tweetsApiSub', tweet)
  Store.addTweet({
    ...tweet,
    id: Date.now(),
    isLiked: false,
  })
})

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

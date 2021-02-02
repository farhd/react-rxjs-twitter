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

function updateState(newState, from) {
  state = { ...state, ...newState, from }
  subject.next(state)
}

const Store = {
  initialState,
  init: () => {
    updateState(initialState)
    setTimeout(() => {
      const tweets = { ...state.tweets }
      const tweetsArr = Object.values(tweets)
      for (let i = tweetsArr.length - 1; i >= 0; --i) {}
    }, 2000)
  },
  subscribe: (setState) => subject.subscribe(setState),
  clearFeed: () => {
    Object.values(state.tweets).forEach((tweet) => clearTimeout(tweet.timerId))
    updateState(initialState)
  },
  updateTweet: ({ id, payload }) => {
    let tweets = { ...state.tweets }
    if (payload === null) {
      clearTimeout()
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
    Store.updateTweet({ id, payload: null, from: 'removeTweet' })
  },
  addTweet: (tweet) => {
    updateState({
      tweets: {
        [tweet.id]: {
          ...tweet,
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

tweetsApi.subscribe((tweet) => {
  const id = Date.now()
  console.log('[tweetsApi]', tweet)
  const timerId = setInterval(() => {
    Store.removeTweet({ id })
  }, 30000)
  Store.addTweet({
    ...tweet,
    id,
    timerId: timerId,
    isLiked: false,
  })
})

export default Store

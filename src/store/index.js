import { Subject, pipe } from 'rxjs'
import { scan, map } from 'rxjs/operators'

import { tweets as tweetsApi } from '../common/api'
import { filters } from '../common/const'

const subject = new Subject()
const initialState = {
  tweets: {},
  likesCount: 0,
  filter: filters.ALL,
}

const Store = {
  initialState,
  Actions: (update) => {
    return {
      clearFeed: () => {
        // Object.values(state.tweets).forEach((tweet) =>
        //   clearTimeout(tweet.timerId)
        // )
        update((state) => {
          state = initialState
          return state
        })
      },
      updateTweet: ({ id, payload, from }) => {
        update((state) => {
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
          return { ...state, tweets, likesCount: recountLikes(tweets) }
        })
      },
      removeTweet: ({ id }) => {
        Actions.updateTweet({ id, payload: null, from: 'removeTweet' })
      },
      addTweet: (tweet) => {
        update((state) => {
          return {
            ...state,
            tweets: {
              ...state.tweets,
              [tweet.id]: {
                ...tweet,
                // timerId,
              },
            },
          }
        })
      },
      updateLikesCount: (newCount) => {
        update((state) => {
          return {
            ...state,
            likesCount: newCount,
          }
        })
      },
      updateFilter: (newFilter = filters.ALL) => {
        update((state) => {
          return {
            ...state,
            filter: newFilter,
          }
        })
      },
    }
  },
}

const update = (payload) => {
  return subject.next(payload)
}
export const State = subject.pipe(
  scan((state, patch) => {
    return patch(state)
  }, Store.initialState)
)
export const Actions = Store.Actions(update)

function recountLikes(tweets) {
  // recount likes
  return Object.values(tweets).filter((tweet) => tweet.isLiked).length
}

// subject.subscribe((newState) => {
//   console.log('[Store]', newState)
// })

tweetsApi.subscribe((tweet) => {
  console.log('[tweetsApi]', tweet)

  const id = Date.now()
  const timerId = setInterval(() => {
    Actions.removeTweet({ id })
  }, 30000)
  Actions.addTweet({
    ...tweet,
    id,
    timerId: timerId,
    isLiked: false,
  })
})

export default Store

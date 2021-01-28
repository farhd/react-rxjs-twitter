import { useState, useEffect } from 'react'

import Store from './store'
import { filters } from './common/const'

import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Widgets from './components/Widgets'

import './App.css'

function App() {
  const [state, setState] = useState(Store.initialState)
  const [filteredTweets, setFilteredTweets] = useState([])

  useEffect(() => {
    Store.subscribe(setState)
    Store.init()
  }, [])

  useEffect(() => {
    let tweets = []
    switch (state.filter) {
      case filters.ALL:
        tweets = Object.values(state.tweets)
        break
      case filters.LIKED:
        tweets = Object.values(state.tweets).filter((tweet) => tweet.isLiked)
        break
      default:
        tweets = []
    }
    setFilteredTweets(tweets)
  }, [state.filter, state.tweets])

  return (
    <div className="App flex justify-center mx-auto h-screen">
      <Sidebar />
      <Feed {...state} tweets={filteredTweets} />
      <Widgets />
    </div>
  )
}

export default App

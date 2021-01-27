import { useState, useEffect } from 'react'

import Store from './store'

import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Widgets from './components/Widgets'

import './App.css'

function App() {
  const [state, setState] = useState(Store.initialState)

  useEffect(() => {
    console.log(state.tweets)
  }, [state.tweets])

  useEffect(() => {
    Store.subscribe(setState)
    Store.init()
  }, [])

  return (
    <div className="App flex justify-center mx-auto h-screen">
      <Sidebar />
      <Feed values={Object.values(state.tweets)} />
      <Widgets />
    </div>
  )
}

export default App

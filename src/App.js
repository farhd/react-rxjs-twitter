import { useState, useEffect } from 'react'

import Store from './store'

import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Widgets from './components/Widgets'

import './App.css'

function App() {
  const [{ tweets, likesCount }, setState] = useState(Store.initialState)

  useEffect(() => {
    Store.subscribe(setState)
    Store.init()
  }, [])

  return (
    <div className="App flex justify-center mx-auto h-screen">
      <Sidebar />
      <Feed tweets={Object.values(tweets)} likesCount={likesCount} />
      <Widgets />
    </div>
  )
}

export default App

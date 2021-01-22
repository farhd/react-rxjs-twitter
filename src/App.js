import logo from './logo.svg'
import './App.css'

import { tweets } from './common/api'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    tweets.subscribe(console.log.bind(console))
    return () => {
      tweets.unsubscribe(console.log.bind(console))
    }
  }, [])

  return (
    <div className="App m-4 p-4">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App

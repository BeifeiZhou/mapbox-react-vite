import { useState, useRef, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import './App.less'
import { MapDisplay } from './MapDisplay.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <MapDisplay />
    </div>
  )
}

export default App

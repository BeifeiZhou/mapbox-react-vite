import { useState, useRef, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import './App.less'
import { MapPage } from './pages/map/MapPage.jsx'
import {Profile} from './pages/profile/Profile.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'antd/dist/antd.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RailwayForm from './assets/components/railwayForm'
import StoredData from './assets/components/storedData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RailwayForm />
      <StoredData />
    </>
  )
}

export default App

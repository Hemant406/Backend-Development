import React from 'react'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/create-post" element={<CreatePost/>} />
          <Route path="/posts" element={<Feed/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
// 因為是面後端職缺，所以對前端頁面的刻劃比較陽春，如果對前端作品有興趣請參考我的作品集 https://profolio-plum.vercel.app 謝謝您

'use client'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import BookDetail from './BookDetail/page'
import Home from './Home/page'
import Upload from './Upload/page'

function App() {
  return (
    <Router>
      <nav className="bg-gray-100 p-4 flex gap-4">
        <Link to="/" className="text-blue-600 font-bold">🏠 首頁</Link>
        <Link to="/upload" className="text-green-600">➕ 上傳書籍</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  )
}

export default App
// git add .
// git commit -m "Question 3 commit" 
// git push
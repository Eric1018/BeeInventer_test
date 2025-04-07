'use client'
import { supabase } from '@/superbase'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Book {
  id: string
  title: string
  created_at: string
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [search, setSearch] = useState('')

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('book')
      .select('id, title, created_at')
      .ilike('title', `%${search}%`)
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setBooks(data)
  }

  useEffect(() => {
    fetchBooks()
  }, [search])

  return (
    <div className="p-6 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">📚 所有書籍</h1>

      <input
        type="text"
        placeholder="🔍 搜尋書名"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`} className="text-blue-700 hover:underline">
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

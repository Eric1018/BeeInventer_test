'use client'
import { supabase } from '@/superbase'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface Book {
  title: string
  content?: string
  pdf_url?: string
}

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      const { data, error } = await supabase
        .from('book')
        .select('*')
        .eq('id', id)
        .single()

      if (error) console.error(error)
      else setBook(data)
    }

    fetchBook()
  }, [id])

  if (!book) return <p className="p-6">讀取中...</p>

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <button
        onClick={() => navigate('/')}
        className="text-sm text-gray-500 underline"
      >
        ← 返回
      </button>

      <h1 className="text-2xl font-bold">{book.title}</h1>
      {book.content && (
        <p className="whitespace-pre-line text-sm">{book.content}</p>
      )}
      {book.pdf_url && (
        <a
          href={book.pdf_url}
          target="_blank"
          className="text-blue-600 underline block"
        >
          查看 PDF
        </a>
      )}
    </div>
  )
}

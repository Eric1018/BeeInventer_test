'use client'

import { supabase } from '@/superbase'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Upload() {
  const navigate = useNavigate()

  // State for form input fields
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [pdf, setPdf] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePickFile = () => {
    fileInputRef.current?.click()
  }

  // Main upload handler
  const handleUpload = async () => {
    if (!title) return alert('請填寫書名')
    if (!content && !pdf) return alert('請輸入內容或上傳 PDF')

    let pdf_url: string | null = null

    // If PDF is selected, upload it to Supabase storage
    if (pdf) {
      const ext = pdf.name.split('.').pop()
      const path = `${Date.now()}_${title}.${ext}` 

      const { error: uploadError } = await supabase.storage
        .from('books-pdf') 
        .upload(path, pdf) 

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return alert(`PDF 上傳失敗：${uploadError.message}`)
      }

      // Retrieve the public URL of uploaded PDF
      const { data } = supabase.storage.from('books-pdf').getPublicUrl(path)
      pdf_url = data.publicUrl
    }

    // Insert metadata into the `book` table 
    const { data: insertData, error: insertError } = await supabase
      .from('book') 
      .insert([{ title, content: content || null, pdf_url }])
      .select() 

    if (insertError) {
      console.error('[❌ Insert Error]', insertError)
      return alert(`寫入失敗：${insertError.message || JSON.stringify(insertError)}`)
    }

    console.log('[✅ Insert Success]', insertData)

    alert('✅ 書籍上傳成功！')
    navigate('/') 
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <button
        onClick={() => navigate('/')}
        className="text-sm text-gray-500 underline hover:text-gray-700 cursor-pointer"
      >
        ← 返回
      </button>

      <h1 className="text-xl font-bold">上傳書籍</h1>

      <input
        type="text"
        placeholder="書名"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <label className="block font-semibold">輸入內容（或上傳 PDF）：</label>
      <textarea
        placeholder="輸入書籍內容"
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
          if (e.target.value) setPdf(null) 
        }}
        className="w-full p-2 border rounded h-32"
        disabled={!!pdf} 
      />

      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null
          setPdf(file)
          if (file) setContent('') 
        }}
        className="hidden"
      />

      <button
        onClick={handlePickFile}
        className={`px-4 py-2 text-white rounded ${
          content
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
        }`}
        disabled={!!content}
      >
        選擇 PDF 檔案
      </button>

      {pdf && (
        <p className="text-sm text-gray-600">📄 已選擇：{pdf.name}</p>
      )}

      <br />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
      >
        上傳
      </button>
    </div>
  )
}

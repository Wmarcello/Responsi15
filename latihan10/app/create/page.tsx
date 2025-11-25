'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      content,
    };

    const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPosts = [...existingPosts, newPost];
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    router.push('/');
  };

  return (
    <div className="container mt-5">
      <h1>Buat Post Baru</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Isi Post</label>
          <textarea
            className="form-control"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Simpan
        </button>
      </form>
    </div>
  );
}

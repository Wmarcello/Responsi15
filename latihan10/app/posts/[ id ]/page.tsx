'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Blog {
  id: number;
  title: string;
  content: string;
}

export default function PostDetail() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [post, setPost] = useState<Blog | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const foundPost = savedPosts.find((p: Blog) => p.id === id);
    if (foundPost) {
      setPost(foundPost);
      setTitle(foundPost.title);
      setContent(foundPost.content);
    }
  }, [id]);

  const handleDelete = () => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPosts = savedPosts.filter((p: Blog) => p.id !== id);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    router.push('/');
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPosts = savedPosts.map((p: Blog) =>
      p.id === id ? { ...p, title, content } : p
    );
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPost({ id, title, content });
    setIsEditing(false);
  };

  if (!post) return <div className="container mt-5">Post tidak ditemukan.</div>;

  return (
    <div className="container mt-5">
      {isEditing ? (
        <form onSubmit={handleEdit}>
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

          <button type="submit" className="btn btn-success me-2">
            Simpan Perubahan
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsEditing(false)}
          >
            Batal
          </button>
        </form>
      ) : (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>

          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-warning me-2"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Hapus
          </button>
        </>
      )}
    </div>
  );
}

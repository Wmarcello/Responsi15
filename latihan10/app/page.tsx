'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Blog {
  id: number;
  title: string;
  content: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Blog</h1>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Cari judul..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Link href="/create" className="btn btn-primary mb-4">
        + Buat Post Baru
      </Link>

      {filteredPosts.length === 0 ? (
        <p>Tidak ada post ditemukan.</p>
      ) : (
        <ul className="list-group">
          {filteredPosts.map((post) => (
            <li key={post.id} className="list-group-item">
              <Link href={`/posts/${post.id}`} className="text-decoration-none">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

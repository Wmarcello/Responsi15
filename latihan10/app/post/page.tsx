"use client";

import { useState, useEffect } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

interface post {
  id: number;
  title: string;
  content: string;
}
  async function createPost() {
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    location.reload(); // refresh page
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>POSTS</h1>

      <input
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <textarea
        placeholder="Konten"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />

      <button onClick={createPost}>Tambah Post</button>

      <hr />
      <h2>Daftar Post</h2>


      {posts.map((p: post) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          <strong>{p.title}</strong>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}


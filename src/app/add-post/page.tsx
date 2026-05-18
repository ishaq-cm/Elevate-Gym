"use client";

import { useState } from "react";

export default function AddPostPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/add-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Post created successfully!");
        setTitle("");
      } else {
        setStatus("❌ Error: " + data.error);
      }
    } catch (err) {
      setStatus("❌ Failed to connect");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Add New Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            fontSize: "16px",
            color: "black",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Create Post
        </button>
      </form>

      {status && (
        <p
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f0f0f0",
            color: "black",
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const BlogDetails = () => {
  const { slug } = useParams(); // 👈 get post ID
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://dummyjson.com/posts/${slug}`);
      const data = await response.json();
      setPost(data);
      console.log(data);
    };
    fetchPost();
  }, [slug]);

  if (!post) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 text-lg mb-4">{post.body}</p>

      <div className="text-sm text-gray-600 space-y-2 flex gap-2">
        <p>👤 <span className="font-medium">User ID:</span> {post.userId}</p>
        <p>👁️ <span className="font-medium">Views:</span> {post.views}</p>
        <p>👍 <span className="font-medium">Likes:</span> {post.reactions?.likes}</p>
        <p>👎 <span className="font-medium">Dislikes:</span> {post.reactions?.dislikes}</p>
        <p>🏷️ <span className="font-medium">Tags:</span>
          {post.tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full ml-2"
            >
              {tag}
            </span>
          ))}
        </p>
      </div>
    </div>

  );
};

export default BlogDetails;

import { useEffect, useState } from "react";
import { Post } from "./Post";

const apiUrl = import.meta.env.VITE_API_URL;
export const PostList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch" + response.ok);
        }
        const { posts } = await response.json();
        setPosts(posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  return posts.map((post, i) => {
    if (i > 5) return;

    return <Post index={post.id} post={post} />;
  });
};

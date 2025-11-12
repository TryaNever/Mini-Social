import { useEffect, useState } from "react";
import { Post } from "./Post";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
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

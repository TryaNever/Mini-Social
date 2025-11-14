import { Suspense, useEffect, useState } from "react";
import { PostSkeleton } from "../squeleton/PostSkeleton";
import { Post } from "./Post";

const apiUrl = import.meta.env.VITE_API_URL;
export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch" + response.ok);
        }
        const { posts } = await response.json();
        setPosts(posts);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </>
    );
  }

  return posts.map((post, i) => {
    if (i > 5) return null;

    return (
      <Suspense key={post.id}>
        <Post index={post.id} post={post} />
      </Suspense>
    );
  });
};

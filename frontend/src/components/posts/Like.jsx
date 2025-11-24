import { Suspense, useState } from "react";

import { DisplayComment } from "../comments/DisplayComment";
const apiUrl = import.meta.env.VITE_API_URL;
export const Like = ({ post }) => {
  const [like, setLike] = useState(false);
  async function handleLike() {
    try {
      const response = await fetch(`${apiUrl}/api/posts/${post.id}/like`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch" + response.ok);
      }
      if (like) {
        post.likes -= 1;
      } else {
        post.likes += 1;
      }
      setLike((prev) => !prev);
    } catch {
      setLike(like);
    }
  }

  return (
    <Suspense>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (localStorage.getItem("JWT")) {
            handleLike();
            return;
          }
          window.location.href = "/connexion";
        }}
        className="group flex items-center gap-2 px-2 py-1 rounded-md 
             transition-colors duration-200 
             hover:bg-gray-100 active:bg-gray-200"
      >
        <i
          className={`ri-heart-${
            like ? "fill" : "line"
          } text-xl transition-colors ${
            like ? "text-red-600" : "text-black goup-hover:text-red-500"
          }`}
        ></i>

        <span
          className={`text-sm font-medium transition-colors ${
            like ? "text-red-600" : "text-black"
          }`}
        >
          {post.likes}
        </span>
      </button>
    </Suspense>
  );
};

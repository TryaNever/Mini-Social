import { Suspense, useState } from "react";
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Suspense>
      <div className="flex items-center justify-between pt-4 border-t border-slate-700/40 mt-4">
        <button
          onClick={() => {
            if (localStorage.getItem("JWT")) {
              handleLike();
              return;
            }
            window.location.href = "/connexion";
          }}
          className="group flex items-center gap-2 px-4 py-2 rounded-full 
               bg-gradient-to-br from-slate-900/60 to-slate-800/60 
               hover:from-slate-800/60 hover:to-slate-700/60
               border border-slate-700/50 hover:border-red-400/40
               shadow-inner shadow-black/20 hover:shadow-black/30
               transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <i
              className={`ri-heart-${
                like ? "fill" : "line"
              } text-2xl transition-all duration-300 ${
                like
                  ? "text-red-500 drop-shadow-[0_0_8px_rgba(255,70,70,0.45)]"
                  : "text-slate-300 group-hover:text-red-400"
              }`}
            ></i>

            {!like && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="ri-heart-fill text-2xl text-red-500/20 blur-sm"></i>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`text-sm font-bold transition-colors ${
                like ? "text-red-400" : "text-slate-200 group-hover:text-white"
              }`}
            >
              {post.likes}
            </span>
            <span className="text-xs font-medium text-white transition-colors">
              {post.likes > 1 ? "j'aime" : "j'aime"}
            </span>
          </div>

          {like && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-0 left-1/4 text-red-400 opacity-70 animate-ping">
                  <i className="ri-heart-fill text-xs"></i>
                </div>
              </div>
            </div>
          )}
        </button>

        <div className="flex items-center gap-4 text-black">
          <div className="flex items-center gap-1.5 text-sm transition-colors">
            <i className="ri-chat-3-line text-lg"></i>
            <span className="font-medium">{post.comments?.length || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm transition-colors">
            <i className="ri-share-line text-lg"></i>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

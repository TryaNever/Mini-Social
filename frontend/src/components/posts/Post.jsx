import { Suspense } from "react";
import { DisplayComment } from "../comments/DisplayComment";
import { Like } from "./Like";
import { NewComment } from "../comments/NewComment";
import { Link, useNavigate } from "react-router-dom";

export const Post = ({ post, index }) => {
  const navigate = useNavigate();
  return (
    <Suspense>
      <div
        key={index}
        role="button"
        aria-label={`Voir le post de ${post.author}`}
        tabIndex={0}
        className="
    bg-gray-50 
    h-auto
    rounded-xl 
    shadow-md 
    overflow-hidden 
    w-full 
    border border-gray-300
    hover:shadow-xl 
    transition-all 
    duration-300 
    cursor-pointer
    focus:outline-none
    focus:ring-2 
    focus:ring-blue-600 
    focus:ring-offset-2
  "
        onClick={() => navigate(`/posts/${index}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") navigate(`/posts/${index}`);
        }}
      >
        <img
          className="w-full h-40 object-cover"
          src={`${post.image_url}.webp`}
          alt={post.content}
          loading="lazy"
        />

        <div className="p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src={post.author_image_url || "/default-avatar.png"}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
              loading="lazy"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {post.author}
              </p>
              <p className="text-xs text-gray-600">Auteur du post</p>
            </div>
          </div>

          <p className="text-md font-medium text-gray-800 line-clamp-2">
            {post.content}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/40 mt-4">
            <Like post={post} />

            <div className="flex items-center gap-4 text-black">
              <DisplayComment comments={post.comments} idPost={post.id} />
              <div className="flex items-center gap-1.5 text-sm transition-colors">
                <i className="ri-share-line text-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

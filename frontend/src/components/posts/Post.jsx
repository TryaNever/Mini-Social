import { Suspense, useState } from "react";
import { DisplayComment } from "../comments/DisplayComment";
import { Like } from "./Like";
import { NewComment } from "../comments/NewComment";

export const Post = ({ post, index }) => {
  return (
    <Suspense>
      <div
        key={index}
        className="bg-white rounded-lg shadow-md overflow-hidden w-full border border-2"
      >
        <img
          className="w-full h-40 object-cover"
          src={`${post.image_url}.webp`}
          alt={post.content}
        />
        <div className="p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src={post.author_image_url || "/default-avatar.png"}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {post.author}
              </p>
              <p className="text-xs text-gray-500">Auteur du post</p>
            </div>
          </div>
          <p className="text-md font-medium text-gray-700 line-clamp-2">
            {post.content}
          </p>
          <Like post={post} />
        </div>
        <div className="border-t border-gray-100">
          <DisplayComment comments={post.comments} idPost={index} />
        </div>
        <div className="p-3 text-right">
          <a
            href={`posts/${index}`}
            className="text-sm text-blue-600 hover:underline"
          >
            Voir plus →
          </a>
        </div>
      </div>
    </Suspense>
  );
};

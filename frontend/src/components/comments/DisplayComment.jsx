import React, { useState } from "react";
import { Comment } from "./Comment";
import { NewComment } from "./NewComment";

export const DisplayComment = React.memo(({ comments, idPost }) => {
  const [commentsPatch, setCommentsPatch] = useState(comments);
  const [commentOpen, setCommentOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <i
        className="ri-chat-1-line text-2xl cursor-pointer hover:text-blue-500 transition-colors"
        onClick={() => {
          if (localStorage.getItem("JWT")) {
            setCommentOpen(true);
            return;
          }
          window.location.href = "/connexion";
        }}
        title="Voir les commentaires"
      ></i>
      {commentOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setCommentOpen(false)}
        >
          <div
            className="bg-white rounded-xl w-11/12 max-w-md max-h-[80vh] flex flex-col shadow-xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-100 rounded-t-xl">
              <h3 className="text-lg font-semibold text-gray-800">
                Commentaires
              </h3>
              <i
                className="ri-close-circle-line text-2xl text-gray-500 hover:text-red-500 cursor-pointer transition"
                onClick={() => setCommentOpen(false)}
              ></i>
            </div>
            {/* --- Formulaire Nouveau Commentaire --- */}
            <div className="p-4 border-b border-gray-100">
              <NewComment
                index={idPost}
                onCommentAdded={(newComment) =>
                  setCommentsPatch((prev) => [newComment, ...prev])
                }
              />
            </div>
            {/* --- Liste des commentaires --- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {commentsPatch.length === 0 ? (
                <p className="text-gray-500 italic text-center">
                  Aucun commentaire pour le moment.
                </p>
              ) : (
                commentsPatch.map((comment, index) => (
                  <Comment key={index} comment={comment} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

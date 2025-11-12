import React from "react";

export const NewComment = ({ index, onCommentAdded }) => {
  async function handleOnSubmitComment(e) {
    e.preventDefault();
    const input = e.target.elements[`content-comment-${index}`];
    const commentContent = input.value.trim();

    if (!commentContent) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${index}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
          body: JSON.stringify({
            comment: commentContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi : " + response.status);
      }

      const newComment = await response.json();

      if (onCommentAdded) {
        onCommentAdded(newComment.comment);
      }
      input.value = "";
    } catch (error) {
      console.error("Erreur :", error);
    }
  }

  return (
    <form
      onSubmit={handleOnSubmitComment}
      className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm"
    >
      <div className="flex flex-col flex-1">
        <label
          htmlFor={`content-comment-${index}`}
          className="text-sm text-gray-600 mb-1"
        >
          Entrer votre commentaire
        </label>
        <input
          type="text"
          name={`content-comment-${index}`}
          id={`content-comment-${index}`}
          placeholder="Votre commentaire..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:scale-95 transition text-sm font-medium shadow h-full"
      >
        Envoyer
      </button>
    </form>
  );
};

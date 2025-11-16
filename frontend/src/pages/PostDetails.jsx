import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DisplayComment } from "../components/comments/DisplayComment";
import { Like } from "../components/posts/Like";
const apiUrl = import.meta.env.VITE_API_URL;

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/posts/${id}`);
        if (!response.ok) throw new Error("Failed to fetch post");

        const res = await response.json();
        setPost(res.post);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Chargement...</p>;
  }

  if (!post) {
    return (
      <p className="text-center mt-10 text-red-500">
        Impossible de charger le post.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 border border-gray-200">
      <img
        src={post.image_url}
        alt={post.content}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {post.content}
      </h3>

      <p className="text-gray-600 mb-1">Auteur : {post.author}</p>
      <Like post={post} />
      <p className="text-sm text-gray-500 mb-4">
        Créé le : {new Date(post.created_at).toLocaleString("fr-FR")}
      </p>
      <DisplayComment comments={post.comments || []} idPost={id} />
    </div>
  );
}

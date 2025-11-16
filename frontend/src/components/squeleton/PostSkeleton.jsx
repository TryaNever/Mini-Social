export const PostSkeleton = (key) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden w-full animate-pulse"
      key={key}
    >
      {/* Image */}
      <div className="w-full h-40 bg-gray-300"></div>

      {/* Contenu */}
      <div className="p-4 space-y-3">
        {/* Auteur */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 border border-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>

        {/* Texte du post */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        {/* Like */}
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>

      {/* Commentaires */}
      <div className="border-t border-gray-100 p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Voir plus */}
      <div className="p-3 text-right">
        <div className="h-3 bg-gray-300 rounded w-1/6 ml-auto"></div>
      </div>
    </div>
  );
};

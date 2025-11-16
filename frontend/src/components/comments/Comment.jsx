import { Suspense, useState } from "react";
export const Comment = ({ comment }) => {
  console.log(comment);
  const [imageRandomGenerate, setImageRandomGenerate] = useState(
    Math.random(1, 500)
  );
  return (
    <Suspense>
      <div className="flex items-start space-x-4 bg-white p-5 rounded-xl shadow border border-gray-100">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={comment.user_image_url}
          alt="Avatar"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-semibold text-gray-900">
              {comment.user}
            </h4>
          </div>
          <p className="mt-2 text-gray-700 leading-relaxed w-full">
            {comment.comment}
          </p>
        </div>
      </div>
    </Suspense>
  );
};

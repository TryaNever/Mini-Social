import { Suspense } from "react";
import { Helmet } from "react-helmet";

import { PostList } from "../components/posts/PostList";

export default function Home() {
  return (
    <Suspense>
      <Helmet>
        <title>MySocialApp</title>
      </Helmet>
      <div className="bg-gray-50 min-h-screen text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 ">
          <PostList key={1} />
        </div>
      </div>
    </Suspense>
  );
}

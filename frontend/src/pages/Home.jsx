import { Suspense } from "react";
import { PostList } from "../components/posts/PostList";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <Suspense>
      <Helmet>
        <title>MySocialApp</title>
      </Helmet>
      <div className="bg-gray-50 min-h-screen text-center">
        <h1> React + Vite + Express + Mysql + Docker</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 ">
          <PostList key={1} />
        </div>
      </div>
    </Suspense>
  );
}

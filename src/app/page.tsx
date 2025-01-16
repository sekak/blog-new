import PostCard from "@/components/post-card";
import { POSTS } from "@/lib/posts";
import Pagination from "@/components/pagination";

export default async function Home() {

  return (
    <div className="">
      <div className="max-w-7xl mx-auto mt-10 p-6">
        <div className="flex items-center flex-col justify-center">
        <h1 className="text-4xl font-bold">Welcome to Med Blog</h1>
        <p className="mt-5 text-lg text-justify">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
        {
          POSTS.map((post) => (
            <PostCard key={post.id} {...post}/>
          ))
        }
        </div>
        <Pagination />
        </div>
      </div>
    </div>
  );
}

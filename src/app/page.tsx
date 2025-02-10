'use server'
import Feed from "@/components/feed/feed";

export default async function page() {
  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <div className="flex items-center flex-col justify-center">
        <h1 className="text-4xl font-bold">Welcome to Med Blog</h1>
        <p className="mt-5 text-lg text-justify">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <Feed/>
      </div>
    </div>
  );
}

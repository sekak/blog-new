'use server'
import Post from "@/components/post/post";

async function page() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Post/>
    </div>
  );
}

export default page;

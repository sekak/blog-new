'use server'
import Post from "@/components/post/post";

async function page() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Post/>
    </div>
  );
}

export default page;

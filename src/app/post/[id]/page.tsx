'use server'
import PostComment from "@/components/posts/postComment";

async function page({ params }: { params: { id: string } }) {
  const {id} = params
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <PostComment id={id}/>
    </div>
  );
}

export default page;

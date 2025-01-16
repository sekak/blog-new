import Comments from "@/components/comments/comments";
import PostComment from "@/components/post/post";

function page() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <PostComment />
      <Comments />
    </div>
  );
}

export default page;

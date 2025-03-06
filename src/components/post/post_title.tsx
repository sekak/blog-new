import UserCard from "@/utils/user";

function PostTitle({ post, user_id }: { post: { title: string; }; user_id: string; }) {
  return (
    <div className="space-y-6 py-4 border-b w-full">
      <h1 className="font-bold text-4xl">{post?.title}</h1>
      <UserCard user_id={user_id} />
    </div>
  );
}

export default PostTitle;
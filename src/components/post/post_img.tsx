import Picture from "@/utils/image";

function PostImage({ post }: { post: { image: string; }; }) {
  return (
    <div className="">
      <Picture src={post?.image ?? ""} />
    </div>
  );
}

export default PostImage;
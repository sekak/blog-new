import { ArrowLeftIcon, Share } from "lucide-react";
import SaveIcon from "../save_post";

function Header({ post }: { post: { id: string; save: boolean; }; }) {
  return (
    <div className="flex w-full justify-between my-4">
      <div className=" bg-gray-500 bg-opacity-0 p-2 hover:bg-opacity-15 rounded-full cursor-pointer" onClick={() => window.history.back()}>
        <ArrowLeftIcon color="gray" />
      </div>
      <div className="flex gap-5">
        {post?.id && <SaveIcon post_id={post?.id} isSaved={post?.save} color="gray" />}
        <Share className="cursor-pointer" color="gray" />
      </div>
    </div>
  );
}

export default Header;
import { TruncatedText } from "@/components/ui/truncated-text";

function PostDescription({ post }: { post: { description: string; }; }) {
  return (
    <div className="space-y-4">
      <p className="text-xl italic leading-8 w-full break-words">
        <TruncatedText content={post?.description ?? ""} charLimit={300} />
      </p>
    </div>
  );
}

export default PostDescription;
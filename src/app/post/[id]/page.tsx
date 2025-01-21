import Comments from "@/components/comments/comments";
import { Suspense, lazy } from "react";
const PostComment = lazy(() => import("@/components/post/post"));
import SkeletonCard from "@/components/skeleton";

async function page({params}) {
  
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Suspense fallback={<SkeletonCard count={1}/>}>
          <PostComment params={params} />
      </Suspense>
      <Comments params={params}/>
    </div>
  );
}

export default page;

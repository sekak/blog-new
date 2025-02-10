'use server'
import Write from "@/components/write/write";

export default async function page() {

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">

      <div className="border rounded-lg flex flex-col gap-10 p-6">
        <div>
          <h1 className="font-semibold text-xl">Create a New Post</h1>
          <p className="text-sm text-muted-foreground">Share your thoughts with the community</p>
        </div>
        <Write />
      </div>
    </div>
  );
}

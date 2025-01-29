'use client'
import { Card, Skeleton } from "@heroui/react";

interface SkeletonCardProps {
  count: number;
  mainClassName?: string;
}

export default function SkeletonCard(props: SkeletonCardProps) {
  if(props.count <= 0) return null;
  return (
    <>
      {Array(props.count).fill(1).map((_, i) => (
        <div key={i} className={props.mainClassName}>
          <Card className="w-full h-[400px] space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-[300px] rounded-lg bg-default-300" />
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
}
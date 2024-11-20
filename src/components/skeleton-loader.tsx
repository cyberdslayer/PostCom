import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const SkeletonPost = () => (
  <Card className="mb-4 ">
    <CardContent className="pt-4">
      <div className="flex items-center mb-4">
        <Skeleton className="h-10 w-10 rounded-full mr-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </CardContent>
    <CardFooter className="flex flex-col items-start">
      <div className="w-full flex justify-between items-center mb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
      <SkeletonComment />
      <SkeletonComment />
    </CardFooter>
  </Card>
);

const SkeletonComment = () => (
  <div className="bg-muted p-2 rounded-md mb-2 w-full">
    <div className="flex items-center mb-2">
      <Skeleton className="h-6 w-6 rounded-full mr-2" />
      <Skeleton className="h-3 w-24" />
    </div>
    <Skeleton className="h-3 w-full mb-1" />
    <Skeleton className="h-3 w-3/4" />
  </div>
);

export default function SkeletonLoader({ numPosts = 3 }) {
  return (
    <div className="container min-w-full mx-auto p-4">
      <div className="flex gap-2 justify-between  items-center animate-pulse">
        <div className="flex gap-2 justify-center items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div className="w-24 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="w-20 h-8 bg-gray-300 rounded mt-4"></div>
      </div>
      <p className="mb-8 w-1/2 h-4 bg-gray-300 rounded animate-pulse"></p>
      <Button className="w-40 h-10 bg-gray-300 rounded animate-pulse mb-8"></Button>

      <div className="h-[calc(100vh-200px)] ">
        {Array.from({ length: numPosts }).map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </div>
    </div>
  );
}

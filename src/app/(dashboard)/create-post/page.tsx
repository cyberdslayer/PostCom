"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bold,
  Italic,
  Underline,
  LinkIcon,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import SkeletonLoader from "@/components/skeleton-loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";
import { generateFromString } from "generate-avatar";
import { AuthUser } from "../profile/page";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Post {
  uid: string;
  _id: string;
  content: string;
  comments: Comment[];
}
interface Comment {
  uid: string;
  _id: string;
  text: string;
}

const RichTextEditor = ({
  content,
  setContent,
  onSubmit,
  fullScreen = false,
}: {
  content: string;
  setContent: (content: string) => void;
  onSubmit: () => void;
  fullScreen?: boolean;
  placeholder?: string;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      if (editorRef.current) {
        editorRef.current.innerHTML = content;
      }
    }
  );

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };
  const execCommand = (
    command: string,
    value: string | undefined = undefined
  ) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div
      className={`border rounded-md p-2 ${
        fullScreen ? "h-full flex flex-col" : ""
      }`}
    >
      <div className="flex gap-2 mb-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => execCommand("bold")}
          aria-label="Toggle bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => execCommand("italic")}
          aria-label="Toggle italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => execCommand("underline")}
          aria-label="Toggle underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const url = window.prompt("Enter the URL");
            if (url) execCommand("createLink", url);
          }}
          aria-label="Insert link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className={`border p-2 rounded-md ${
          fullScreen ? "flex-grow overflow-y-auto" : ""
        } ${fullScreen ? "min-h-[100px]" : "min-h-[50px]"}`}
        style={{ direction: "ltr", unicodeBidi: "bidi-override" }}
      />
      <Button className="mt-2" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default function Home() {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState<{[key: string]: boolean;}>({});
  const [expandedComments, setExpandedComments] = useState<{[key: string]: boolean;}>({});

  const { user } = useAuth() as { user: AuthUser | null };
  const router = useRouter();

  // Post API for creating a post
  const createPost = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newPost, uid: user?.email }),
      });

      if (response.status === 200) {
        fetchPosts();
      }
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        return console.log("error in creating post", error.message);
      }
      return console.log("error in creating post", error);
    }
  };
  // Get API for fetching all the posts
  const fetchPosts = async () => {
    const response = await fetch("/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("this is the data", data);
    setPosts(data.data);
    setIsLoading(false);
  };
  //Post API for Creating Comments
  const createComment = async (postId: string) => {
    try {
      console.log({ id: postId, content: newComment, uid: user?.email });
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: postId,
          content: newComment,
          uid: user?.email,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.status === 200) {
        const { _id, text, postId, uid } = data.data;
        handleCreateCommentResponse(uid, postId, text, _id);
        setNewComment("");
      }
    } catch (error) {
      if (error instanceof Error) {
        return console.log("error in creating post", error.message);
      }
      return console.log("error in creating post", error);
    }
  };

  const handleCreateCommentResponse = (
    uid: string,
    postid: string,
    comment: string,
    commentID: string
  ) => {
    // console.log("This is data as a response", uid, postid, comment, commentID)
    const updatedPost = posts.map((post) => {
      if (post._id === postid) {
        console.log(post);
        const newComment = {
          uid,
          _id: commentID,
          text: comment,
        };
        const commentList = [newComment, ...post.comments];
        post.comments = commentList;
        // post.comments.push(newComment);
        // console.log(post)
        return post;
      }
      return post;
    });
    setPosts(updatedPost);
  };
  const handleCreatePost = () => {
    if (newPost.trim()) {
      // setPosts([...posts, { _id: Date.now(), content: newPost, comments: [] }])
      setNewPost("");
      setIsPostDialogOpen(false);
      createPost();
    }
  };
  const handleAddComment = (postId: string) => {
    if (newComment && newComment.trim()) {
      createComment(postId);
      setShowCommentBox({ ...showCommentBox, [postId]: false });
    }
  };
  const handleSignout = () => {
    signOut(auth);
    router.push("/auth");
  };

  const toggleCommentBox = (postId: string) => {
    setShowCommentBox((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };
  const toggleExpandComments = (postId: string) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  function formatDateTime(isoString: string) {
    const date = new Date(isoString);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return `${formattedTime} ${formattedDate}`;
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="md:w-[90vh] scrollbar-hide h-screen">
        <SkeletonLoader />
      </div>
    );
  }
  return (
    <div>
      <div className=" w-full mx-auto p-4">
        <div className="flex gap-2 justify-between">
          <div className="flex  gap-2">
            <Avatar>
              <AvatarImage
                src={`data:image/svg+xml;utf8,${generateFromString(
                  user?.email || "default"
                )}`}
                alt={"this user"}
              />
            </Avatar>
            <h1 className="text-2xl font-bold">{user?.email}</h1>
          </div>
          <div>
            <Button onClick={handleSignout}>Logout</Button>
          </div>
        </div>
        <p className="mb-4 mt-4">What's on your mind?</p>

        <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-8 " >Create a New Post</Button>
          </DialogTrigger>
          <DialogContent className="  p-0">
            <div className="h-full flex flex-col">
              <DialogHeader className="p-4 flex-shrink-0">
                <DialogTitle>Create a New Post</DialogTitle>
              </DialogHeader>
              <div className="flex-grow overflow-hidden p-4">
                <RichTextEditor
                  content={newPost}
                  setContent={setNewPost}
                  onSubmit={handleCreatePost}
                  fullScreen={true}
                  placeholder="What's on your mind?"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {posts &&
            posts.map((post) => (
              <Card key={post._id} className="mb-4">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                      src={`data:image/svg+xml;utf8,${generateFromString(
                        post?._id || "default"
                      )}`}
                      alt={"this user"}
                      />
                      <AvatarFallback>{"user"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {post?.uid?.split("@")[0]}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  <p className="text-sm text-gray-700 mt-4">
                    {formatDateTime("2024-11-18T15:19:35.010+00:00")}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <div className="w-full flex justify-between items-center mb-2">
                    <h3 className="font-semibold">
                      Comments ({post.comments.length})
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCommentBox(post._id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span>
                        {showCommentBox[post._id] ? "Hide" : "Add Comment"}
                      </span>
                    </Button>
                  </div>
                  {post.comments
                    .slice(0, expandedComments[post._id] ? undefined : 2)
                    .map((comment) => (
                      <div
                        key={comment._id}
                        className="bg-muted p-2 rounded-md mb-2 w-full"
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage
                              src={`data:image/svg+xml;utf8,${generateFromString(
                                post?._id || "default"
                              )}`}
                              alt={"user"}
                            />
                            <AvatarFallback>{"user"}</AvatarFallback>
                          </Avatar>
                          <p className="font-semibold text-xs">
                            {comment?.uid}
                          </p>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{ __html: comment.text }}
                        />
                      </div>
                    ))}
                  {post.comments.length > 2 && (
                    <Button
                      variant="link"
                      onClick={() => toggleExpandComments(post._id)}
                    >
                      {expandedComments[post._id] ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-2" />
                          <span>Show less</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" />
                          <span>
                            Show {post.comments.length - 2} more comments
                          </span>
                        </>
                      )}
                    </Button>
                  )}
                  {showCommentBox[post._id] && (
                    <div className="w-full mt-2">
                      <RichTextEditor
                        content={newComment}
                        setContent={(content) => {
                          setNewComment(content);
                        }}
                        onSubmit={() => handleAddComment(post._id)}
                        placeholder="Add a comment..."
                      />
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
        </ScrollArea>
      </div>
    </div>
  );
}

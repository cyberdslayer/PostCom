"use client";

import { useState, useRef, useEffect, useCallback} from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
  X,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { NextResponse } from "next/server";

interface Post {
  _id: string;
  content: string;
  comments: Comment[];
}

interface Comment {
  _id: string;
  text: string;
}

const RichTextEditor = ({
  content,
  setContent,
  onSubmit,
  fullScreen = false,
  placeholder = "",
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
    },
    [
      // content
    ]
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
        } ${fullScreen ? "min-h-[300px]" : "min-h-[50px]"}`}
        style={{ direction: "ltr", unicodeBidi: "bidi-override" }}
        // placeholder={placeholder}
        // aria-label={placeholder}
      />
      <Button className="mt-2" 
      onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  // const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedComments, setExpandedComments] = useState<{
    [key: string]: boolean;
  }>({});
  const [isPostSuccess, setIsPostSuccess] = useState(false);
  // storing new Comment
  const [newComment, setNewComment] = useState<string>("");

  // Post API for creating a post
  const createPost = async () => {
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: newPost }),
        });
  
        if(response.status===200){
          fetchPosts()
        }
        console.log(response)
      } catch (error: any) {
        return console.log("error in creating post", error.message);
      } finally {
        setIsPostSuccess(true);
      }
    }
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
  };
  //Post API for Creating Comments
  const createComment = async (postId:string) => {
    try {
      const response =  await fetch("/api/comments",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: postId, content:newComment}),
      } );
      console.log(response.json());
           
    } catch (error:any) {
      return console.log("Error fetching Comments")
    }
  }

  useEffect(()=>{
        fetchPosts();
  },[])
  

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

  const toggleCommentBox = (postId: string) => {
    setShowCommentBox((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleExpandComments = (postId: string) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="container w-[80%] mx-auto p-4">
      <h1 className="text-2xl font-bold">Postcom</h1>
      <p className="mb-8">A platform to share your thoughts and ideas</p>

      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-8">Create a New Post</Button>
        </DialogTrigger>
        <DialogContent className="max-w-full h-screen p-0">
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
            <div className="flex-shrink-0 p-4">
              <Button onClick={() => setIsPostDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ScrollArea className="h-[calc(100vh-200px)]">
        {posts && posts.map((post) => (
          <Card key={post._id } className="mb-4">
            <CardContent className="pt-6">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
                  {showCommentBox[post._id] ? "Hide" : "Add Comment"}
                </Button>
              </div>
              {post.comments
                .slice(0, expandedComments[post._id] ? undefined : 2)
                .map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-muted p-2 rounded-md mb-2 w-full"
                  >
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
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Show {post.comments.length - 2} more comments
                    </>
                  )}
                </Button>
              )}
              {showCommentBox[post._id] && (
                <div className="w-full mt-2">
                  <RichTextEditor
                    content={newComment}
                  
                    setContent={(content) =>{
                      console.log("this is content", content);
                      setNewComment(content);
                      // setNewComments({ ...newComments, [post._id]: content });
                      }
                    }
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
  );
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Bold, Italic, Underline, LinkIcon, X, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'

interface Post {
  id: number
  content: string
  comments: Comment[]
}

interface Comment {
  id: number
  content: string
}

const RichTextEditor = ({ content, setContent, onSubmit, fullScreen, placeholder }: { content: string, setContent: (content: string) => void, onSubmit: () => void, fullScreen?: boolean, placeholder?: string }) => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content
    }
  }, [
    
    // content


  ])

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  return (
    <div className={`border rounded-md p-2 ${fullScreen ? 'h-full flex flex-col' : ''}`}>
      <div className="flex gap-2 mb-2">
        <Button size="sm" variant="outline" onClick={() => execCommand('bold')} aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => execCommand('italic')} aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => execCommand('underline')} aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const url = window.prompt('Enter the URL')
            if (url) execCommand('createLink', url)
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
        className={`border p-2 rounded-md ${fullScreen ? 'flex-grow overflow-y-auto' : ''} ${
          fullScreen ? 'min-h-[300px]' : 'min-h-[50px]'
        }`}
        style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}
        // placeholder={placeholder}
        aria-label={placeholder}
      />
      <Button className="mt-2" onClick={onSubmit}>Submit</Button>
    </div>
  )
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({})
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)
  const [showCommentBox, setShowCommentBox] = useState<{ [key: number]: boolean }>({})
  const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({})

  const handleCreatePost = () => {
    if (newPost.trim()) {
      setPosts([...posts, { id: Date.now(), content: newPost, comments: [] }])
      setNewPost('')
      setIsPostDialogOpen(false)
    }
  }

  const handleAddComment = (postId: number) => {
    const comment = newComments[postId]
    if (comment && comment.trim()) {
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, { id: Date.now(), content: comment }] }
          : post
      ))
      setNewComments({ ...newComments, [postId]: '' })
      setShowCommentBox({ ...showCommentBox, [postId]: false })
    }
  }

  const toggleCommentBox = (postId: number) => {
    setShowCommentBox(prev => ({ ...prev, [postId]: !prev[postId] }))
  }

  const toggleExpandComments = (postId: number) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }))
  }

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
        {posts.map(post => (
          <Card key={post.id} className="mb-4">
            <CardContent className="pt-6">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div className="w-full flex justify-between items-center mb-2">
                <h3 className="font-semibold">Comments ({post.comments.length})</h3>
                <Button variant="ghost" size="sm" onClick={() => toggleCommentBox(post.id)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {showCommentBox[post.id] ? 'Hide' : 'Add Comment'}
                </Button>
              </div>
              {post.comments.slice(0, expandedComments[post.id] ? undefined : 2).map(comment => (
                <div key={comment.id} className="bg-muted p-2 rounded-md mb-2 w-full">
                  <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                </div>
              ))}
              {post.comments.length > 2 && (
                <Button variant="link" onClick={() => toggleExpandComments(post.id)}>
                  {expandedComments[post.id] ? (
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
              {showCommentBox[post.id] && (
                <div className="w-full mt-2">
                  <RichTextEditor
                    content={newComments[post.id] || ''}
                    setContent={(content) => setNewComments({ ...newComments, [post.id]: content })}
                    onSubmit={() => handleAddComment(post.id)}
                    placeholder="Add a comment..."
                  />
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}
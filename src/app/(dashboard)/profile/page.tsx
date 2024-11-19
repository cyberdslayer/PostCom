/**
 * v0 by Vercel.
 * @see https://v0.dev/t/u9gWAgM3AKc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="grid max-w-4xl mx-auto gap-8 px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="grid gap-4 lg:grid-cols-[200px_1fr] lg:items-start">
        <div className="flex flex-col gap-2 items-center lg:items-start">
          <Avatar className="w-40 h-40 lg:w-48 lg:h-48 bg-gray-200 dark:bg-gray-700 rounded-full">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>
              <UserIcon className="w-20 h-20 lg:w-24 lg:h-24" />
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <Button variant="outline">Edit Profile</Button>
            {/* <Button>Send Message</Button> */}
          </div>
        </div>
        <div className="grid gap-8">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Shubham Mishra</h1>
            <p className="text-gray-500 dark:text-gray-400">Full-Stack Developer</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Hi there! I'm Shubham, a passionate full-stack developer with a love for building innovative web
              applications. I enjoy exploring new technologies and constantly expanding my skillset. When I'm not
              coding, you can find me hiking or reading a good book.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <UserIcon className="w-4 h-4" />
              <span>User ID: 123456</span>
              <BadgeIcon className="w-4 h-4" />
              <span>Role: Developer</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="grid gap-4">
              <div className="flex gap-4 items-start">
                <Avatar className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>
                    <CodeIcon className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h3 className="font-semibold">New Project Launch</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Shubham launched a new project called "Task Manager" on GitHub.
                  </p>
                  <time className="text-sm text-gray-400">2 days ago</time>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Avatar className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>
                    <PenIcon className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h3 className="font-semibold">New Blog Post</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Shubham published a new blog post titled "The Power of React\n Hooks".
                  </p>
                  <time className="text-sm text-gray-400">1 week ago</time>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Avatar className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>
                    <StarIcon className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h3 className="font-semibold">New Contribution</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Shubham contributed to the popular open-source project "React-Redux".
                  </p>
                  <time className="text-sm text-gray-400">2 weeks ago</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BadgeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  )
}


function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}


function PenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  )
}


function StarIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function UserIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
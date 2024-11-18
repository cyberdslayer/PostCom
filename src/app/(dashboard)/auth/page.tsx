'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/lib/firebase/firebase'
import { AlertDialog } from '@radix-ui/react-alert-dialog'


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!isLogin){
       return signUpHandler();
    }
    return signInHandler();

  }

const signUpHandler = async () =>{

     try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        if(user){
          setIsLogin(true)
        }
     } catch (error:any) {
        alert(`Error: ${error.message}`);
     }
   

}

const signInHandler = async () =>{
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if(user){
          router.push('/create-post')
        }
    } catch (error:any) {
        alert(`Error: ${error.message}`);
    }
   

}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Welcome back! Please login to your account.' : 'Create a new account to get started.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button className="w-full mt-4" type="submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="w-full">
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
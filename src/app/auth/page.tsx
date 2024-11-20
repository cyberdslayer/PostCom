'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/lib/firebase/firebase'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({})
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {}
    
    if (!email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid"
    }

    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      if (isLogin) {
        await signInHandler()
      } else {
        await signUpHandler()
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const signUpHandler = async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    if (userCredential.user) {
      toast({
        title: "Account created",
        description: "You have successfully signed up. Please log in.",
      })
      setIsLogin(true)
    }
  }

  const signInHandler = async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    if (userCredential.user) {
      const loggedInUser = auth.currentUser;
      console.log("current user is" + loggedInUser);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      })
      router.push('/create-post')
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
                  aria-invalid={!!validationErrors.email}
                  aria-describedby={validationErrors.email ? "email-error" : undefined}
                />
                {validationErrors.email && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription id="email-error">{validationErrors.email}</AlertDescription>
                  </Alert>
                )}
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
                  aria-invalid={!!validationErrors.password}
                  aria-describedby={validationErrors.password ? "password-error" : undefined}
                />
                {validationErrors.password && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription id="password-error">{validationErrors.password}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="w-full">
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={!!error} onOpenChange={() => setError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Authentication Error</AlertDialogTitle>
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
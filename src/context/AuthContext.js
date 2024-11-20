"use client"


import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/lib/firebase/firebase";
import {onAuthStateChanged} from "firebase/auth"

const AuthContext = createContext({});


export function AuthProvider({children}) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    
    setCurrentUser(auth.currentUser)

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
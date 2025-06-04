import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";
const auth = getAuth(app);
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const creatUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
      

    return () => {
      unsubscribe();
    };
  }, []);
    
    const logOut = () => {

      return  signOut(auth)
        

    }
    
    
    
    const loginUser = (email,password) => {
        

        return signInWithEmailAndPassword(auth, email, password)
    }

  const info = {
    creatUser,
    user,
      setUser,
      loginUser,
    logOut
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

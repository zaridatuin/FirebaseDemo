import React, { createContext, useState, useEffect } from 'react';
import {
    browserSessionPersistence,
    getAuth,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword
} from "firebase/auth";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState('')

    const auth = getAuth();
    const login = async (username, password) => {
        try{
          await setPersistence(auth, browserSessionPersistence);
          await signInWithEmailAndPassword(auth, username, password);
        }catch(err){
          throw err
        }
    };

    const logout = async () => {
        try{
            auth.signOut();
        }catch(err){
            throw err
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.displayName)
            }else{
                setUser(null)
            }
        });
    },[])

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
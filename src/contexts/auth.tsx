import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import client from "../firebase/client"
import firebase from "firebase/app";
import "firebase/auth";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  client();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {});
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, "token", token, {});
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
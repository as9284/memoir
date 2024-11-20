import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { auth } from "./services/firebase";
import { Loading } from "./components/Loading";
import { AppContent } from "./components/AppContent";

export const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <AppContent user={user} />
    </BrowserRouter>
  );
};

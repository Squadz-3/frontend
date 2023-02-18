import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authState = localStorage.getItem("SquadData");
    if (authState) {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading };
};

export default useAuth;

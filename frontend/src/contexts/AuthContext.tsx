import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;  // you can handle response here (show success message)
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }
    } catch (error) {
      throw error;  // Rethrow error for the calling component (i.e. Signup)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// src/context/UserContext.tsx
import API from "@/lib/api";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router";

type User = {
  userId: number;
  username: string;
  email: string;
  role: string;
  firstName: string;
  profile: string;
  isVerified: boolean;
} ;

type UserContextType = {
  user: User;
  setUser: (user: User | null) => void;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    userId: 0,
    username: "",
    email: "",
    role: "",
    firstName: "",
    profile: "",
    isVerified: false,
  });

 const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await API.get("/users/me"); // Adjust the endpoint as needed       
        setUser(response.data);
      } catch (error) {
         setUser(null);
        localStorage.removeItem("token");
        // localStorage.removeItem("isAuthenticated");
      }
    };
    fetchLoggedInUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

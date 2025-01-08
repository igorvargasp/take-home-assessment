import { AuthContext } from "@/components/Auth";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Not logged in");
  }
  return context;
};

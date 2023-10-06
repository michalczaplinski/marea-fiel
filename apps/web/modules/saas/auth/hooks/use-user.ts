import { useContext } from "react";
import { userContext } from "../lib";

export function useUser() {
  const context = useContext(userContext);
  return context;
}

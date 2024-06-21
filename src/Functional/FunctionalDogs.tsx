import "../App.css";
import { ReactNode } from "react";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}
const Wrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "px-4 md:px-0 h-full w-full max-w-screen-xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;

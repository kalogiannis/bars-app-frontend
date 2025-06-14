

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading: boolean;
}

const LoadingButton = ({ 
  isLoading, 
  children, 
  disabled, 
  ...props 
}: LoadingButtonProps) => {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
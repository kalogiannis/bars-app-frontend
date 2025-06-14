

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  size?: SpinnerSize;
}

export const Spinner = ({ size = "md" }: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-t-primary border-r-primary/30 border-b-primary/10 border-l-primary/30 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

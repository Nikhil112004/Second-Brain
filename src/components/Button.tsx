import { ReactElement, ButtonHTMLAttributes } from "react";

type Variants = "primary" | "secondary" | "full-width";
export type Sizes = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variants;
  size?: Sizes;
  title?: string;
  startIcon?: ReactElement;
  loading?: boolean;
}

const variantStyles: Record<Variants, string> = {
  primary: "bg-purple-600 text-white hover:bg-purple-700",
  secondary: "bg-purple-100 text-purple-600 hover:bg-purple-200",
  "full-width": "bg-purple-500 text-white hover:bg-purple-600 w-full",
};

const sizeStyles: Record<Sizes, string> = {
  sm: "text-sm py-2 px-4",      
  md: "text-base py-3 px-5",   
  lg: "text-lg py-4 px-7",      
};


const defaultStyles =
  "rounded-lg flex items-center justify-center font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]";


export const Button = ({
  variant = "primary",
  size = "md",
  title,
  startIcon,
  loading,
  onClick,
  className = "",
  ...rest
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${variantStyles[variant]} ${defaultStyles} ${sizeStyles[size]} ${
        loading ? "opacity-60 cursor-wait" : ""
      } ${className}`}  
      {...rest}
    >
      {startIcon && <span className="mr-2 flex">{startIcon}</span>}
      {loading ? "Loading..." : title}
    </button>
  );
};

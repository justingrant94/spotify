import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}


const Box: React.FC<BoxProps> = ({
  children,
  className
}) => {
  return (
    <div className={twMerge(`
    bg-cyan-950	
    rounded-md
    text-rose-500
    h-fit
    w-full
    font-bold
    text-center
    `, className
    )}>
      {children}
    </div>
  )
}


export default Box;
//this is a fullscreen wrapper that you can use as a shadow background or a pop up container in the middle of screen

interface ScreenWrapperTypes extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const ScreenWrapper = ({
  className,
  children,
  ...props
}: ScreenWrapperTypes) => {
  return (
    <div className={`absolute ${className}`} {...props}>
      <div className="sticky w-full h-[100vh] max-h-full top-0 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default ScreenWrapper;

import { ReactNode } from "react";

interface TitleCentralProps {
  children: ReactNode;
}

const TitleCentral = (props: TitleCentralProps) => {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-3">
      <hr className="w-full text-neutral-300" />
      {props.children}
      <hr className="w-full text-neutral-300" />
    </div>
  );
};
export default TitleCentral;

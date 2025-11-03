import Link from "next/link";
import VscodeSvg from "./icons/vscode-svg";

const Logo = ({ ...props }: any) => {
  return (
    <Link href={"/"} className="text-primary py-2">
      <VscodeSvg fill={"currentColor"} className="h-full"></VscodeSvg>
    </Link>
  );
};

export default Logo;

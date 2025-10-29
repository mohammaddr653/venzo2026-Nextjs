import { nastaliq } from "@/app/ui/fonts";

const Logo = () => {
  return (
    <h1
      className={`${nastaliq.className} text-4xl text-primary dark:text-secondary font-weight400`}
    >
      محمدامین درخشنده
    </h1>
  );
};

export default Logo;

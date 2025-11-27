import AccordionBootstrap from "./accordionBootstrap";
import "@/assets/css/accordion.css";

const AccordionUl = ({
  children,
  id,
  className,
  ...props
}: Readonly<{
  children: React.ReactNode;
  id: string;
  className?: string;
}>) => {
  return (
    <>
      <AccordionBootstrap Uid={id}></AccordionBootstrap>
      <ul id={id} className={`accordion-ul ${className}`} {...props}>
        {children}
      </ul>
    </>
  );
};

export default AccordionUl;

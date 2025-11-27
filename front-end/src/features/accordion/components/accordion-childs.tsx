const AccordionChilds = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return (
    <div className={`accordion-childs ${className}`}>
      <div>{children}</div>
    </div>
  );
};

export default AccordionChilds;

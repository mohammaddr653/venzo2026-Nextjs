const AccordionHead = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return <div className={`accordion-head ${className}`}>{children}</div>;
};

export default AccordionHead;

const AccordionLi = ({
  children,
  className,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return (
    <li className={`accordion-li ${className}`} {...props}>
      {children}
    </li>
  );
};

export default AccordionLi;

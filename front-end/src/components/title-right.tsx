interface TitleRightProps {
  title: any;
  className: string;
}

const TitleRight = ({ title, className }: TitleRightProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <h1
        className={`${className} text-size17 font-weight300 text-neutral-900 text-nowrap`}
      >
        {title}
      </h1>
      <span className="bg-neutral-200 grow h-[0.5px]"></span>
    </div>
  );
};
export default TitleRight;

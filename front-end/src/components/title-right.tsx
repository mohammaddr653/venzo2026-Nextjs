interface TitleRightProps {
  title: any;
}

const TitleRight = (props: TitleRightProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <h1 className="text-size17 font-weight300 text-neutral-900 text-nowrap">
        {props.title}
      </h1>
      <span className="bg-neutral-200 w-full h-[0.5px]"></span>
    </div>
  );
};
export default TitleRight;

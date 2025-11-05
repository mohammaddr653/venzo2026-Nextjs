const Offpercent = ({ percent }: any) => {
  return (
    <span className="text-nowrap text-white bg-red-600 w-[35px] py-[1px] flex items-center justify-center rounded-lg font-weight300 text-size13">
      {`${percent}%`}
    </span>
  );
};

export default Offpercent;

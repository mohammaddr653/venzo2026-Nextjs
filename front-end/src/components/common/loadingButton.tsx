//this button used for loading buttons

interface LoadingButtonProps {
  loading?: any;
  disabled?: any;
  form?: any;
  children?: any;
  className?: any;
}

const LoadingButton = (props: LoadingButtonProps) => {
  return (
    <button
      type="submit"
      disabled={props.loading | props.disabled ? true : false}
      className={props.className}
      form={props.form}
      aria-label="submit button"
    >
      {props.loading ? "loading" : props.children}
    </button>
  );
};
export default LoadingButton;

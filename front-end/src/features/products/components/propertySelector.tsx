interface PropertySelectorProps {
  type: "color" | "ordinary";
  propertyval: any;
  formData: any;
}
const PropertySelector = (props: PropertySelectorProps) => {
  if (props.type === "color") {
    return (
      <span
        className={`cursor-pointer w-8 h-8 flex border-2 rounded-full shadow-full-ring border-white z-10 inner ${
          props.formData.selectedPropertyvalString ===
            props.propertyval.propertyval._id &&
          " outline-2 outline-green-600"
        }`}
        style={{
          backgroundColor: "#" + props.propertyval.propertyval.hex.toString(),
        }}
      ></span>
    );
  }
  if (props.type === "ordinary") {
    return (
      <div
        className={`bg-secondary cursor-pointer px-3 py-1 rounded-lg  border-2 border-white ${
          props.formData.selectedPropertyvalString ===
            props.propertyval.propertyval._id &&
          "border-2 border-white outline-2 outline-green-600"
        }`}
      >
        {props.propertyval.propertyval.value}
      </div>
    );
  }
};

export default PropertySelector;

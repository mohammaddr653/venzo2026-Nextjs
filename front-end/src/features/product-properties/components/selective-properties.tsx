import PropertySelector from "./propertySelector";

interface SelectivePropertiesGridProps {
  formData: any;
  product: any;
  handleSelectProperty: any;
}

const SelectiveProperties = (props: SelectivePropertiesGridProps) => {
  return (
    <div>
      {props.product?.properties.length
        ? props.product.properties.map((property: any, index: any) => {
            if (property.selective) {
              return (
                <div key={index} className=" flex flex-col gap-2">
                  <h4 className="flex flex-row gap-1">
                    <span className="font-weight300 text-neutral-900">
                      {property.property.name} :
                    </span>
                    <span>{props.formData.selectedPropertyvalValue}</span>
                  </h4>
                  <form className="selective-property-form flex flex-row flex-wrap gap-1">
                    {property.values.map((propertyval: any, index: any) => {
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name="selectiveProperty"
                            value={propertyval.propertyval._id.toString()}
                            className="hidden property-selector-input"
                            checked={
                              props.formData.selectedPropertyvalString ===
                              propertyval.propertyval._id
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              props.handleSelectProperty(
                                e,
                                propertyval.propertyval.value
                              )
                            }
                          />
                          <PropertySelector
                            propertyval={propertyval}
                            type={property.property.type}
                            formData={props.formData}
                          ></PropertySelector>
                        </label>
                      );
                    })}
                  </form>
                </div>
              );
            }
          })
        : null}
    </div>
  );
};
export default SelectiveProperties;

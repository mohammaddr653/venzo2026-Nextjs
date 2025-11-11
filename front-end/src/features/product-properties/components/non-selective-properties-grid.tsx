import TitleCentral from "@/components/title-central";

interface NonSelectivePropertiesGridProps {
  product: any;
}

const NonSelectivePropertiesGrid = (props: NonSelectivePropertiesGridProps) => {
  if (props.product?.properties.some((obj: any) => !obj.selective)) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col gap-8">
          <ul className="grid grid-cols-3 gap-2">
            {props.product.properties
              .filter((obj: any) => !obj.selective)
              .slice(0, 4)
              .map((property: any, index: any) => {
                return (
                  <li
                    key={index}
                    className="flex flex-col bg-neutral-200 rounded-md p-2"
                  >
                    <h5 className="text-neutral-500 text-size14">
                      {property.property.name}
                    </h5>
                    <ul className="flex flex-row gap-1">
                      {property.values.map((propertyval: any, index: any) => {
                        if (index > 1) {
                          return <li key={index}>...</li>;
                        }
                        if (index <= 1) {
                          if (
                            index === property.values.length - 1 ||
                            index === 1
                          ) {
                            return (
                              <li
                                key={index}
                                className="flex flex-row gap-0.5 items-center"
                              >
                                <h4>
                                  {propertyval.propertyval
                                    ? propertyval.propertyval.value
                                    : propertyval.valueString}
                                </h4>
                              </li>
                            );
                          } else {
                            return (
                              <li
                                key={index}
                                className="flex flex-row gap-0.5 items-center"
                              >
                                <h4>
                                  {propertyval.propertyval
                                    ? propertyval.propertyval.value
                                    : propertyval.valueString}
                                </h4>
                                <span>,</span>
                              </li>
                            );
                          }
                        }
                      })}
                    </ul>
                  </li>
                );
              })}
          </ul>
          <TitleCentral>
            <a href="#product-properties" className="text-size15 text-nowrap text-neutral-700 border border-neutral-300 px-4 py-2 rounded-md flex flex-row items-center justify-center gap-1">
              <span>مشاهده همه ویژگی ها</span>
              <i className="bi bi-chevron-left text-size13"></i>
            </a>
          </TitleCentral>
        </div>
      </div>
    );
  }
};
export default NonSelectivePropertiesGrid;

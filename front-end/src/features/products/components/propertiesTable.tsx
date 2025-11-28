//جدولی برای نمایش کامل مشخصات محصول

interface PropertiesTableProps {
  product: any;
}

const PropertiesTable = ({ product }: PropertiesTableProps) => {
  if (product?.properties) {
    return (
      <div
        id="product-properties"
        className=" px-5 md:px-20 flex flex-col gap-4 scroll-mt-20"
      >
        <h4 className="font-weight300 text-neutral-800">مشخصات محصول</h4>
        {product.properties.map((item: any, index: any) => {
          return (
            <div
              className="flex flex-row items-center justify-between gap-2"
              key={index}
            >
              <p className=" basis-40 text-neutral-600 py-2">
                {item.property.name}
              </p>
              <ul className=" py-2 self-stretch basis-180 grow border-b border-neutral-200 flex flex-row gap-2 flex-wrap">
                {item.values.map((propertyval: any, index: any) => {
                  return (
                    <li className="flex flex-row gap-2" key={index}>
                      <span>
                        {propertyval.propertyval
                          ? propertyval.propertyval.value
                          : propertyval.valueString}
                      </span>
                      {index + 1 !== item.values.length ? (
                        <span className="text-neutral-400">|</span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
};
export default PropertiesTable;

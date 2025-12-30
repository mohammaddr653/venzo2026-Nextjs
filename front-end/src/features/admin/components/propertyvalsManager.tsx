import { useEffect, useState } from "react";
import { discountObj } from "../types/discountObj";
import {
  ProductPropertiesObj,
  ProductPropertyvalsObj,
} from "../types/properties";
import DiscountManager from "./discountManager";
import PropertyvalSuggestions from "./propertyvalSuggestions";

interface PropertyvalsManagerProps {
  properties: ProductPropertiesObj[];
  setProperties: React.Dispatch<React.SetStateAction<ProductPropertiesObj[]>>;
  propertiesAndVals: any;
  selectedProperty: any;
  propertyObj: ProductPropertiesObj;
}

interface propertyvalObj {
  valueString?: string;
  price?: string;
  discount?: discountObj | null;
  stock?: string;
  suggestions: string[];
}

const PropertyvalsManager = (props: PropertyvalsManagerProps) => {
  const {
    propertyObj,
    selectedProperty,
    propertiesAndVals,
    properties,
    setProperties,
  } = props;
  const [propertyval, setPropertyval] = useState<propertyvalObj>({
    valueString: "",
    price: "",
    discount: null,
    stock: "",
    suggestions: [],
  });

  const [discount, setDiscount] = useState<any>(null);

  const [selectedPropertyval, setSelectedPropertyval] = useState<any>("");

  useEffect(() => {
    setPropertyval((prev: any) => {
      return {
        ...prev,
        discount: discount,
      };
    });
  }, [discount]);

  const handleSelectiveChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPropertyval({
      ...propertyval,
      [e.target.name]: e.target.value,
    });
  };

  const handlepropertyval = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.value) {
      const matchedProperty = propertiesAndVals.find(
        (obj: any) => obj.name === selectedProperty
      );
      if (
        matchedProperty &&
        matchedProperty.specifiedVals &&
        matchedProperty.values.length
      ) {
        const matches = matchedProperty.values.filter((obj: any) =>
          obj.value.startsWith(e.target.value)
        );
        setPropertyval({
          ...propertyval,
          valueString: e.target.value,
          suggestions: matches,
        });
      } else {
        setPropertyval({
          ...propertyval,
          valueString: e.target.value,
          suggestions: [],
        });
      }
    } else {
      setPropertyval({
        ...propertyval,
        valueString: "",
        suggestions: [],
      });
    }
  };

  const handleSavePropertyval = async (e: any) => {
    e.preventDefault();
    const matchedProperty = propertiesAndVals.find(
      (obj: any) => obj.name === selectedProperty
    );
    if (matchedProperty && matchedProperty.specifiedVals) {
      const matches = matchedProperty.values.find(
        (obj: any) => obj.value === propertyval.valueString
      );
      if (matches) {
        addPropertyval(matches);
      }
      //note:if the propertyval not exist then it wont be added
      // else {
      //   const formData = {
      //     propertyId: matchedProperty._id,
      //     value: propertyval.valueString,
      //   };
      //   const response = await call(
      //     axios.post(SERVER_API + "/admin/dashboard/propertyvals", formData),
      //     true
      //   );
      //   if (response.status === 200) {
      //     addPropertyval();
      //     loadPropertiesAndVals();
      //   }
      // }
    } else if (matchedProperty && !matchedProperty.specifiedVals) {
      addPropertyval();
    }
  };

  //note: نیاز نیست hex یا valueString داده شود . فقط آیدی بده و در اسکیما با ref بقیه مقادیر بگیر
  const addPropertyval = (matchedPropertyval?: any) => {
    let propertyvalue: ProductPropertyvalsObj = {};

    if (matchedPropertyval) {
      propertyvalue = {
        propertyval: {
          _id: matchedPropertyval._id,
          value: matchedPropertyval.value,
          propertyId: matchedPropertyval.propertyId,
          hex: matchedPropertyval.hex,
        },
      };
      matchedPropertyval.hex
        ? (propertyvalue.propertyval!.hex = matchedPropertyval.hex)
        : null;
    } else {
      propertyvalue = {
        valueString: propertyval.valueString,
      };
    }
    propertyval.price ? (propertyvalue.price = propertyval.price) : null;
    propertyval.discount
      ? (propertyvalue.discount = propertyval.discount)
      : null;
    propertyval.stock ? (propertyvalue.stock = propertyval.stock) : null;

    setProperties((prev) => {
      const exist = prev.find(
        (item) => item.property.name === selectedProperty
      );
      if (exist) {
        const updatedValues = exist.values.filter((item) => {
          if (exist.property.specifiedVals) {
            return (
              item.propertyval?.value !== propertyval.valueString &&
              item.propertyval?.value !== selectedPropertyval
            );
          } else {
            return (
              item.valueString !== propertyval.valueString &&
              item.valueString !== selectedPropertyval
            );
          }
        });
        return prev.map((item) =>
          item.property.name === selectedProperty
            ? { ...item, values: [...updatedValues, propertyvalue] }
            : item
        );
      } else {
        return [...prev];
      }
    });
    resetPropertyval();
  };

  function resetPropertyval() {
    setPropertyval({
      valueString: "",
      price: "",
      discount: null,
      stock: "",
      suggestions: [],
    });
    setSelectedPropertyval("");
    setDiscount(null);
  }

  useEffect(() => {
    resetPropertyval();
  }, [selectedProperty]);

  const handleUpdatePropertyval = (propertyvalObj: ProductPropertyvalsObj) => {
    setSelectedPropertyval(
      propertyvalObj.valueString ?? propertyvalObj.propertyval?.value
    );
    setPropertyval({
      valueString:
        propertyvalObj.valueString ?? propertyvalObj.propertyval?.value,
      price: propertyvalObj.price ?? "",
      discount: null,
      stock: propertyvalObj.stock ?? "",
      suggestions: [],
    });
    if (propertyvalObj.discount) setDiscount({ ...propertyvalObj.discount });
  };

  const handleDeletePropertyval = (
    property: ProductPropertiesObj,
    value: string
  ) => {
    let filteredVals: ProductPropertyvalsObj[] = property?.values.filter(
      (propertyval) => {
        return property.property.specifiedVals
          ? propertyval.propertyval?.value !== value
          : propertyval.valueString !== value;
      }
    );
    setProperties((prev) => {
      return prev.map((item) =>
        item.property.name === property.property.name
          ? { ...item, values: filteredVals ? filteredVals : [] }
          : item
      );
    });
  };

  return (
    <div className=" p-2 rounded-md">
      <div className="flex flex-col gap-1 w-fit">
        <div className="relative">
          <input
            type="text"
            placeholder="مقدار ویژگی"
            name="propertyval"
            onBlur={() => {
              setTimeout(() => {
                setPropertyval((prev: any) => {
                  return { ...prev, suggestions: [] };
                });
              }, 1000);
            }}
            value={propertyval.valueString}
            onChange={handlepropertyval}
            className="border rounded p-1"
            autoComplete="off"
          />
          <PropertyvalSuggestions
            propertyval={propertyval}
            setPropertyval={setPropertyval}
          ></PropertyvalSuggestions>
        </div>
        {propertyObj.selective ? (
          <>
            <input
              type="text"
              placeholder="قیمت"
              name="price"
              value={propertyval.price}
              onChange={handleSelectiveChange}
              className="border rounded p-1"
              autoComplete="off"
            />
            <DiscountManager
              discount={discount}
              setDiscount={setDiscount}
            ></DiscountManager>
            <input
              type="text"
              placeholder="موجودی انبار"
              name="stock"
              value={propertyval.stock}
              onChange={handleSelectiveChange}
              className="border rounded p-1"
              autoComplete="off"
            />
          </>
        ) : null}
        <button
          className="bg-blue-600 text-white p-1 rounded-md"
          onClick={handleSavePropertyval}
          disabled={
            propertyval.valueString &&
            (!propertyObj.selective || (propertyval.price && propertyval.stock))
              ? false
              : true
          }
        >
          افزودن مقدار ویژگی
        </button>
      </div>
      {propertyObj.values.length ? (
        <ul className="mt-4 flex flex-col gap-1">
          {propertyObj.values.map(
            (propertyvalObj: ProductPropertyvalsObj, index: any) => {
              return (
                <li key={index} className="flex flex-row justify-between">
                  <div className="flex gap-2 items-center">
                    <button
                      className="rounded-md bg-red-500 text-white p-1 text-xs"
                      onClick={() => {
                        handleDeletePropertyval(
                          propertyObj,
                          propertyObj.property.specifiedVals
                            ? propertyvalObj.propertyval?.value!
                            : propertyvalObj.valueString!
                        );
                      }}
                    >
                      حذف
                    </button>
                    <span className="text-green-700 font-bold">
                      {propertyObj.property.specifiedVals
                        ? propertyvalObj.propertyval?.value!
                        : propertyvalObj.valueString!}
                    </span>
                  </div>
                  {propertyObj.selective ? (
                    <div className="flex flex-row gap-2">
                      <span className="bg-amber-300">
                        تومان {propertyvalObj.price}
                      </span>
                      {propertyvalObj.discount ? (
                        <span className="bg-amber-300">
                          تومان {propertyvalObj.discount.offer} قیمت در تخفیف
                        </span>
                      ) : null}
                      <span className="bg-amber-300">
                        عدد {propertyvalObj.stock}
                      </span>
                    </div>
                  ) : null}
                  <button
                    className="bg-amber-300 text-sm p-1 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdatePropertyval(propertyvalObj);
                    }}
                  >
                    ویرایش
                  </button>
                </li>
              );
            }
          )}
        </ul>
      ) : null}
    </div>
  );
};
export default PropertyvalsManager;

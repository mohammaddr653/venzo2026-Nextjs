import { ChangeEvent, useState } from "react";
import { ProductPropertiesObj, Property } from "../types/properties";
import PropertySuggestions from "./propertySuggestions";
import PropertyvalsManager from "./propertyvalsManager";

interface propertyObj {
  nameString: string;
  selective: boolean;
  suggestions: string[];
}
interface PropertiesManagerProps {
  properties: ProductPropertiesObj[];
  setProperties: React.Dispatch<React.SetStateAction<ProductPropertiesObj[]>>;
  propertiesAndVals: any;
}

const PropertiesManager = (props: PropertiesManagerProps) => {
  const { properties, setProperties, propertiesAndVals } = props;

  const [property, setProperty] = useState<propertyObj>({
    nameString: "",
    selective: false,
    suggestions: [],
  });

  const [selectedProperty, setSelectedProperty] = useState<any>("");

  const handleproperty = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.value) {
      const matches = propertiesAndVals.filter((obj: any) =>
        obj.name.startsWith(e.target.value)
      );
      setProperty({
        ...property,
        nameString: e.target.value,
        suggestions: matches,
      });
    } else {
      setProperty({ ...property, nameString: "", suggestions: [] });
    }
  };

  const handleSelectiveCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const existAlready = properties.find((item) => item.selective);
    if (existAlready) {
      alert(
        `شما فقط میتوانید یک ویژگی انتخابی اضافه کنید . ویژگی انتخابی فعلی : ${existAlready.property.name}`
      );
    } else {
      setProperty({
        ...property,
        selective: e.target.checked ? true : false,
      });
    }
  };

  const handleSaveProperty = async () => {
    const matches = propertiesAndVals.find(
      (obj: any) => obj.name === property.nameString
    );

    if (matches) {
      if (!matches.specifiedVals && property.selective) {
        alert("تنها ویژگی های با مقادیر مشخص می توانند ویژگی انتخابی باشند");
      } else {
        addProperty(matches);
      }
    }
    //note:if the property not exist then it wont be added
    // else {
    //   let formData = {
    //     name: property.nameString,
    //   };
    //   const response = await call(
    //     axios.post(SERVER_API + "/admin/dashboard/properties", formData),
    //     true
    //   );
    //   if (response.status === 200) {
    //     addProperty();
    //     loadPropertiesAndVals();
    //   }
    // }
  };

  const addProperty = (matchedProperty: Property) => {
    let propertyObj: ProductPropertiesObj = {
      property: {
        _id: matchedProperty._id!, //دیتابیس مانگو فقط انتظار دارد یک آیدی بفرستی اما این مشکلی ایجاد نمیکند چون مانگو هوشمند است
        name: matchedProperty.name,
        specifiedVals: matchedProperty.specifiedVals,
        type: matchedProperty.type,
      },
      selective: property.selective,
      values: [],
    };
    setProperties((prev) => {
      const exist = prev.find(
        (item) => item.property._id === matchedProperty._id
      );
      if (!exist) {
        return [...prev, propertyObj];
      } else {
        return [...prev];
      }
    });
    setProperty({
      nameString: "",
      selective: false,
      suggestions: [],
    });
  };

  const handleDeleteProperty = (id: string) => {
    const filteredProperties = properties?.filter(
      (item) => item.property._id !== id
    );
    setProperties([...filteredProperties]);
  };

  return (
    <div className=" border rounded-md border-neutral-300 p-2 flex flex-col gap-2">
      <h1>مدیریت ویژگی ها</h1>
      <div className="flex-column">
        <div className="relative">
          <input
            type="text"
            placeholder="ویژگی"
            name="property"
            onBlur={() => {
              setTimeout(() => {
                setProperty((prev: any) => {
                  return { ...prev, suggestions: [] };
                });
              }, 1000);
            }}
            value={property.nameString}
            className="border rounded p-1"
            onChange={handleproperty}
            autoComplete="off"
          />
          <PropertySuggestions
            property={property}
            setProperty={setProperty}
          ></PropertySuggestions>
        </div>
        <label>
          <input
            type="checkbox"
            name="selective"
            checked={property.selective ? true : false}
            onChange={handleSelectiveCheck}
          />
          ویژگی انتخابی
        </label>
        <br />
        <button
          className="bg-blue-500 rounded border-2 border-blue-700 p-1"
          onClick={(e) => {
            e.preventDefault();
            handleSaveProperty();
          }}
          disabled={property.nameString ? false : true}
        >
          افزودن ویژگی
        </button>
      </div>
      {props.properties.length
        ? props.properties.map(
            (propertyObj: ProductPropertiesObj, index: any) => {
              return (
                <div className="bg-neutral-200 rounded-md p-5" key={index}>
                  <button
                    className="bg-red-500 text-white float-left p-1 text-xs rounded-lg"
                    onClick={() =>
                      handleDeleteProperty(propertyObj.property._id!)
                    }
                  >
                  حذف
                  </button>
                  <h3 className="text-green-700 font-bold">{propertyObj.property.name}</h3>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProperty(propertyObj.property.name);
                    }}
                  >
                    مدیریت مقادیر ویژگی
                  </button>
                  {selectedProperty === propertyObj.property.name ? (
                    <PropertyvalsManager
                      properties={properties}
                      setProperties={setProperties}
                      propertiesAndVals={propertiesAndVals}
                      selectedProperty={selectedProperty}
                      propertyObj={propertyObj}
                    ></PropertyvalsManager>
                  ) : null}
                </div>
              );
            }
          )
        : null}
    </div>
  );
};
export default PropertiesManager;

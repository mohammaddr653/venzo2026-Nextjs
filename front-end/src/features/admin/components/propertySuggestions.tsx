interface PropertySuggestionsProps {
  property: any;
  setProperty: any;
}

const PropertySuggestions = (props: PropertySuggestionsProps) => {
  return (
    <>
      {props.property.suggestions.length ? (
        <ul className="border-2 bg-amber-400 absolute p-2 border-amber-700 w-[200px]">
          {props.property.suggestions.map((suggest: any, index: any) => {
            return (
              <li
                key={index}
                onClick={() =>
                  props.setProperty({
                    ...props.property,
                    nameString: suggest.name,
                    suggestions: [],
                  })
                }
              >
                {suggest.name}
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

export default PropertySuggestions;

interface PropertySuggestionsProps {
  property: any;
  setProperty: any;
}

const PropertySuggestions = (props: PropertySuggestionsProps) => {
  return (
    <>
      {props.property.suggestions.length ? (
        <ul className="border bg-amber-400 absolute">
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

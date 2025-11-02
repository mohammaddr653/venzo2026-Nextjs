interface PropertyvalSuggestionsProps {
  propertyval: any;
  setPropertyval: any;
}

const PropertyvalSuggestions = (props: PropertyvalSuggestionsProps) => {
  return (
    <>
      {props.propertyval.suggestions.length ? (
        <ul className="border bg-amber-400 absolute">
          {props.propertyval.suggestions.map((suggest: any, index: any) => {
            return (
              <li
                key={index}
                onClick={() => {
                  props.setPropertyval({
                    ...props.propertyval,
                    valueString: suggest.value,
                    suggestions: [],
                  });
                }}
              >
                {suggest.value}
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

export default PropertyvalSuggestions;

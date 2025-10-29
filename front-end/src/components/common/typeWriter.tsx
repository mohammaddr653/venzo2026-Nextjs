//this component is a typing animation that you can use for beautiful type writings
"use client";

import React, { useEffect, useState } from "react";

const TypeWriter = ({ text, speed }: any) => {
  const [displayedText, setDisplayedText] = useState(text);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => {
      clearInterval(interval);
    };
  }, [text, speed]);
  return <React.Fragment>{displayedText}</React.Fragment>;
};

export default TypeWriter;

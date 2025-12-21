import React from "react";

type ArrowProps = {
  color?: string;
  width?: number | string;
  height?: number | string;
};

const Arrow: React.FC<ArrowProps> = ({
  color = "currentColor",
  width = "1em",
  height = "1em",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 93 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}   
    >
      <line
        y1="-1.5"
        x2="24.6114"
        y2="-1.5"
        transform="matrix(0.690738 0.723105 -0.947877 0.318637 73 0.955933)"
        stroke={color}
        strokeWidth="3"
      />
      <line
        y1="-1.5"
        x2="24.6114"
        y2="-1.5"
        transform="matrix(0.690738 -0.723105 -0.947877 -0.318637 73 34.7526)"
        stroke={color}
        strokeWidth="3"
      />
      <line
        y1="18.4559"
        x2="89"
        y2="18.4559"
        stroke={color}
      />
    </svg>
  );
};

export default Arrow;

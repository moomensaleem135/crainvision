import React from "react";

interface RightArrowIconProps {
  fillColor?: string;
  className?: string;
}

const RightArrowIcon: React.FC<RightArrowIconProps> = ({
  fillColor = "white",
  className = "",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 7L14 12L10 17"
        stroke={fillColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default RightArrowIcon;

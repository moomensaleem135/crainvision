import React from "react";

interface AvatarProps {
  fillColor?: string;
  className?: string;
}

const AvatarIcon: React.FC<AvatarProps> = ({
  fillColor = "#7B57E0",
  className = "",
}) => {
  return (
    <svg
      width="61"
      height="60"
      viewBox="0 0 61 60"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="30.5"
        cy="43.75"
        rx="17.5"
        ry="8.75"
        stroke={fillColor}
        stroke-width="3"
        stroke-linejoin="round"
      />
      <circle
        cx="30.5"
        cy="17.5"
        r="10"
        stroke={fillColor}
        stroke-width="3"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default AvatarIcon;

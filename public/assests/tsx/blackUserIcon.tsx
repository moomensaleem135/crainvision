import React from "react";

interface BlackUserIconProps {
  fillColor?: string;
  className?: string;
}

const BlackUserIcon: React.FC<BlackUserIconProps> = ({
  fillColor = "#7B57E0",
  className = "",
}) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 9.61035C10.5771 9.61035 12.6667 10.8038 12.667 12.2764C12.667 13.7491 10.5773 14.9434 8 14.9434C5.42267 14.9434 3.33301 13.7491 3.33301 12.2764C3.33332 10.8038 5.42286 9.61035 8 9.61035ZM8 2.94336C9.47276 2.94336 10.667 4.13759 10.667 5.61035C10.6668 7.08296 9.47265 8.27637 8 8.27637C6.52735 8.27637 5.33318 7.08296 5.33301 5.61035C5.33301 4.13759 6.52724 2.94336 8 2.94336Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default BlackUserIcon;

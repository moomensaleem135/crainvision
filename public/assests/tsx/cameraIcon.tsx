import React from "react";

interface CameraImageProps {
  fillColor?: string;
  className?: string;
}

const CameraImage: React.FC<CameraImageProps> = ({
  fillColor = "#7B57E0",
  className = "",
}) => {
  return (
    <svg
      width="31"
      height="30"
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="15.5" cy="15" r="15" fill={fillColor} />
      <rect
        width="20"
        height="20"
        transform="translate(5.5 5)"
        fill={fillColor}
      />
      <path
        d="M19.833 10.833C22.042 10.833 23.8328 12.624 23.833 14.833V18.5C23.833 20.7091 22.0421 22.5 19.833 22.5H11.167C8.95785 22.5 7.16699 20.7091 7.16699 18.5V14.833C7.16717 12.624 8.95796 10.833 11.167 10.833H19.833ZM15.5 14.167C14.1193 14.167 13 15.2863 13 16.667C13.0002 18.0476 14.1194 19.167 15.5 19.167C16.8806 19.167 17.9998 18.0476 18 16.667C18 15.2863 16.8807 14.167 15.5 14.167ZM16.9297 7.5C17.5982 7.50012 18.2229 7.8344 18.5938 8.39062L19.3887 9.58301H11.6113L12.4062 8.39062C12.7771 7.83437 13.4017 7.50008 14.0703 7.5H16.9297Z"
        fill="white"
      />
    </svg>
  );
};

export default CameraImage;

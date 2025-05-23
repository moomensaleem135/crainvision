import React from "react";

interface DeleteIconProps {
  fillColor?: string;
  className?: string;
}

const DeleteIcon: React.FC<DeleteIconProps> = ({
  fillColor = "#FF3B30",
  className = "",
}) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="15" cy="15" r="15" fill={fillColor} />
      <path
        d="M20.8333 12.4998L20.2367 20.2555C20.1032 21.9921 18.655 23.3332 16.9132 23.3332H13.0868C11.345 23.3332 9.89684 21.9921 9.76326 20.2555L9.16667 12.4998M22.5 10.8332C20.3351 9.77815 17.7614 9.1665 15 9.1665C12.2386 9.1665 9.66493 9.77815 7.5 10.8332M13.3333 9.1665V8.33317C13.3333 7.4127 14.0795 6.6665 15 6.6665C15.9205 6.6665 16.6667 7.4127 16.6667 8.33317V9.1665M13.3333 14.1665V19.1665M16.6667 14.1665V19.1665"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DeleteIcon;

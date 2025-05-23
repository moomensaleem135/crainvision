import React from "react";

interface EmailIconProps {
  fillColor?: string;
  className?: string;
}

const EmailIcon: React.FC<EmailIconProps> = ({
  fillColor = "#7B57E0",
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3H6ZM6.41603 7.37592C6.07138 7.14616 5.60573 7.23929 5.37597 7.58393C5.1462 7.92858 5.23933 8.39423 5.58398 8.624L9.36518 11.1448C10.9607 12.2085 13.0393 12.2085 14.6348 11.1448L18.416 8.624C18.7607 8.39423 18.8538 7.92858 18.624 7.58393C18.3943 7.23929 17.9286 7.14616 17.584 7.37592L13.8028 9.89672C12.7111 10.6245 11.2889 10.6245 10.1972 9.89672L6.41603 7.37592Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default EmailIcon;

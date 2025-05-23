import React from "react";

interface FilterIconProps {
  fillColor?: string;
  className?: string;
}

const FilterIcon: React.FC<FilterIconProps> = ({
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
        d="M13.6837 6.27637C14.5325 6.27637 15.1652 7.05963 14.9874 7.88965L13.7852 13.502C13.5218 14.7315 12.4343 15.6104 11.1768 15.6104H4.82233C3.5649 15.6104 2.47838 14.7315 2.21491 13.502L1.01179 7.88965C0.833944 7.05971 1.46676 6.27652 2.3155 6.27637H13.6837ZM6.37898 2.27637C6.82434 2.27637 7.25716 2.42547 7.60847 2.69922L8.23542 3.1875C8.58673 3.46124 9.01955 3.61035 9.46491 3.61035H11.3331C12.324 3.61035 13.1469 4.3306 13.3057 5.27637H2.66608V4.27637C2.66626 3.17207 3.5618 2.27657 4.66608 2.27637H6.37898Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default FilterIcon;

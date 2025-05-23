import React from "react";

interface CollapseLogoProps {
  fillColor?: string;
  className?: string;
}

const CollapseLogo: React.FC<CollapseLogoProps> = ({
  fillColor = "black",
  className = "",
}) => {
  return (
    <svg
      width="29"
      height="33"
      viewBox="0 0 29 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_10_5516)">
        <path
          d="M22.8354 21.0954V11.3087L25.598 9.71411L28.1555 8.23796C28.2696 8.17212 28.3112 8.02642 28.2372 7.91748C28.0157 7.5915 27.7211 7.32801 27.3689 7.11675L21.6303 3.69113L15.8407 0.357058C15.0127 -0.119019 13.9999 -0.119019 13.1735 0.357058L7.38233 3.6896L1.64377 7.11675C0.823329 7.60656 0.316941 8.49615 0.309428 9.46204L0.256836 16.2217L0.309428 22.9814C0.316941 23.9473 0.823329 24.8369 1.64377 25.3267L7.38233 28.7523L13.1735 32.0849C14.0014 32.561 15.0142 32.561 15.8407 32.0849L21.6318 28.7523L27.3704 25.3267C28.1908 24.8369 28.6972 23.9473 28.7047 22.9814L28.7407 18.0876C28.7421 17.9001 28.5393 17.782 28.3769 17.8758L25.7896 19.3692L22.8354 21.0744V21.0954Z"
          fill={fillColor}
        />
      </g>
      <rect
        width="9.65428"
        height="9.76571"
        transform="matrix(0.862668 0.50577 -2.16947e-08 1 6.20312 11.2915)"
        fill="#421C83"
      />
      <rect
        width="9.65428"
        height="9.76571"
        transform="matrix(0.862668 -0.50577 2.16947e-08 1 14.5352 16.1743)"
        fill="#5B25C0"
      />
      <rect
        width="9.65428"
        height="9.65428"
        transform="matrix(0.862668 0.50577 -0.862668 0.505771 14.5352 6.40869)"
        fill="#7B57E0"
      />
      <defs>
        <clipPath id="clip0_10_5516">
          <rect
            width="28.487"
            height="32.4435"
            fill={fillColor}
            transform="translate(0.256836)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CollapseLogo;

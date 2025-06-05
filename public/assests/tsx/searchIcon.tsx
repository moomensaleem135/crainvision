import React from "react";

interface SearchIconProps {
  fillColor?: string;
  className?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  fillColor = "#7B57E0",
  className = "",
}) => {
  return (
    <svg width="16" height="17" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M17.5 17.5L21 21M20 10.5C20 5.25329 15.7467 1 10.5 1C5.25329 1 1 5.25329 1 10.5C1 15.7467 5.25329 20 10.5 20C15.7467 20 20 15.7467 20 10.5Z" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
  );
};

export default SearchIcon;

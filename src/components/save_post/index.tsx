import { Heart } from 'lucide-react';
import React, { useState } from 'react';

interface SaveIconProps {
  isSaved: boolean;
  className?: string;
  onClick?: () => void;
  fill?: string; 
  color: string; 
}

export default function SaveIcon({ isSaved, className, onClick, fill = 'red', color }: SaveIconProps) {
  const [saved, setSaved] = useState<boolean>(isSaved);

  const handleClick = () => {
    setSaved((prev) => !prev); 
    if (onClick) {
      onClick();
    }
  };

  return (
    <Heart
      className={`w-6 h-6 cursor-pointer ${className || ''}`}
      onClick={handleClick}
      fill={saved ? fill : 'none'}
      color={color}
    />
  );
}
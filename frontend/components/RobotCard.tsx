// Change Log: Updated import/path. No other changes.
import React from 'react';

interface RobotCardProps {
  name: string;
  description: string;
  price: number;
  image?: string;
}

const RobotCard: React.FC<RobotCardProps> = ({ name, description, price, image }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col items-center md:flex-row md:items-start">
      {image && <img src={image} alt={name} className="w-32 h-32 object-cover mb-4 md:mb-0 md:mr-4" />}
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p>{description}</p>
        <p className="text-green-600">${price}</p>
      </div>
    </div>
  );
};

export default RobotCard;
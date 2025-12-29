// Change Log: 
// - Initial creation: Added PartCard component mirroring RobotCard structure. Displays part details with Tailwind styling for responsive design (desktop/mobile). Uses props for data.

import React from 'react';

interface PartProps {
  name: string;
  description: string;
  price: number;
  image?: string;
  compatibleRobots: string[];
}

const PartCard: React.FC<PartProps> = ({ name, description, price, image, compatibleRobots }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow md:w-1/3 sm:w-1/2 w-full">
      {image && <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-lg" />}
      <h3 className="text-xl font-bold mt-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-green-600 font-semibold">${price}</p>
      <p className="text-sm text-gray-500">Compatible with: {compatibleRobots.join(', ')}</p>
    </div>
  );
};

export default PartCard;
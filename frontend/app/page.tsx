// Change Log: 
// - Initial creation: Home page component (assumed basic robot fetch/display).
// - New update: Added section for fetching and displaying parts alongside robots. Uses Axios for API calls, React hooks for state. Responsive grid with Tailwind for desktop/mobile.
// - Fix update: Added interfaces for Robot and Part to type API data. Typed useState hooks. Replaced prop spreads {...robot} and {...part} with explicit prop passing to fix "Spread types may only be created from object types" error and avoid passing extra fields (_id, seller). Assumes seller is populated as {name: string} but not passed to cards since not used.

import { useEffect, useState } from 'react';
import axios from 'axios';
import RobotCard from '../components/RobotCard'; // Assuming this exists
import PartCard from '../components/PartCard';

interface Robot {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  seller: { name: string };
}

interface Part {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  compatibleRobots: string[];
  seller: { name: string };
}

export default function Home() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    axios.get('/api/robots').then(res => setRobots(res.data));
    axios.get('/api/parts').then(res => setParts(res.data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Robot Marketplace</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Robots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {robots.map(robot => (
            <RobotCard 
              key={robot._id} 
              name={robot.name}
              description={robot.description}
              price={robot.price}
              image={robot.image}
            />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-2">Robot Parts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {parts.map(part => (
            <PartCard 
              key={part._id} 
              name={part.name}
              description={part.description}
              price={part.price}
              image={part.image}
              compatibleRobots={part.compatibleRobots}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
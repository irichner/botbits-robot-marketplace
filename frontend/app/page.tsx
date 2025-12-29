// Change Log: Updated to use axios for API calls to backend. Added useEffect dependency.
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RobotCard from '../components/RobotCard';

export default function Home() {
  const [robots, setRobots] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`/api/robots?search=${search}`)
      .then(res => setRobots(res.data))
      .catch(err => console.error(err));
  }, [search]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Robot Marketplace</h1>
      <input
        type="text"
        placeholder="Search robots..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full md:w-1/2"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {robots.map((robot: any) => (
          <RobotCard key={robot._id} {...robot} />
        ))}
      </div>
    </div>
  );
}
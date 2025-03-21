import React from 'react';
import Navbar from '../components/Navbar';
import Event from '../components/Event';
const Index = () => {
  return (
    <div>
      <Navbar />
      <Event />
      <h1 className="text-center text-2xl mt-4">Welcome to WaterUI</h1>
    </div>
  );
};

export default Index;

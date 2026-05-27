import React from 'react';
import Hero from './UI/Hero';

const Home = ({ sanityData }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-primary">
      <Hero sanityData={sanityData} />
    </div>
  );
};

export default Home;

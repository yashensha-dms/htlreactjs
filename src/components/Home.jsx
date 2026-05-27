import React from 'react';
import Hero from './UI/Hero';
import ServiceExcellence from './UI/ServiceExcellence';
import FeaturedProjects from './UI/FeaturedProjects';

const Home = ({ sanityData, projects }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-primary">
      <Hero sanityData={sanityData} />
      <ServiceExcellence />
      <FeaturedProjects projects={projects} />
    </div>
  );
};

export default Home;

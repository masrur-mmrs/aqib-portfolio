import React from 'react';
import Hero from './components/hero';

const page: React.FC= ({}) => {
  return (
    <div>
      <div className="flex flex-col min-h-screen justify-center items-center">
       <Hero/>
      </div>
    </div>
  );
};


export default page;
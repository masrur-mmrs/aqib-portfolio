import React from 'react';
import Hero from './components/hero';

export const revalidate = 30;

const page: React.FC= ({}) => {
  return (
    <div>
       <Hero/>
    </div>
  );
};


export default page;
import React from 'react';
import Hero from './Hero/Hero';
import TechStack from './TechStack/TechStack';
import ContactCTA from './ContactCTA/ContactCTA';



const Home = () => {
  return (
    <main className="home">
      <Hero />

      <TechStack />
      <ContactCTA />

    </main>
  );
};

export default Home;
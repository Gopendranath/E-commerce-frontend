import React, { useEffect } from 'react';
import CategorySection from '../components/Category';
import Featureproduct from '../components/Featureproduct';
import Policy from '../components/Policy';
import FAQ from '../components/FaQ';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto sm:px-6 lg:px-8 py-6 sm:py-8">
        <section>
          <CategorySection />
        </section>
        <section className="mb-8 sm:mb-12">
          <Featureproduct />
        </section>
        <section className="mb-8 sm:mb-12">
          <Policy />
        </section>
        <section className="mb-8 sm:mb-12">
          <FAQ />
        </section>
      </div>
    </main>
  );
};

export default Home;
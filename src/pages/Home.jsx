import React from 'react'
import CategorySection from '../components/Category';
import Featureproduct from '../components/Featureproduct';
import Policy from '../components/Policy';
import FAQ from '../components/FaQ';

const Home = () => {


    return (
        <div>
            <CategorySection />
            <Featureproduct />
            <Policy />
            <FAQ />
        </div>
    )
}

export default Home
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import ProductCard from './Productcard';

const Featureproduct = () => {
  const [electronics, setElectronics] = React.useState([]);
  const [jewelery, setJewelery] = React.useState([]);
  const [clothing, setClothing] = React.useState([]);

  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filteredElectronics = items
      .filter((product) => product.category === 'electronics')
      .sort((a, b) => b.rating.rate - a.rating.rate);
    const filteredJewelry = items
      .filter((product) => product.category === 'jewelery')
      .sort((a, b) => b.rating.rate - a.rating.rate);
    const filteredClothing = [
      ...items.filter((product) => product.category === "men's clothing").slice(0, 2),
      ...items.filter((product) => product.category === "women's clothing").slice(0, 2),
    ].sort((a, b) => b.rating.rate - a.rating.rate);

    setElectronics(filteredElectronics.slice(0, 4));
    setJewelery(filteredJewelry.slice(0, 4));
    setClothing(filteredClothing);
  }, [items]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[50vh] w-full">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-3 border-b-3 border-indigo-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex justify-center items-center min-h-[50vh] w-full">
        <div className="text-center text-lg sm:text-xl text-red-500 font-medium">
          Error loading products
        </div>
      </div>
    );
  }

  // Group items by category
  const itemRows = [
    { title: 'Electronics', items: electronics },
    { title: 'Jewelery', items: jewelery },
    { title: 'Clothing', items: clothing },
  ];

  // Function to render an item row
  const ItemRow = ({ title, items }) => (
    <div className="mb-6 sm:mb-8">
      <div className="flex justify-between items-center mb-3 sm:mb-4 px-2 sm:px-0">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          {title}
        </h3>
        <Link to={`/feature/${title.toLowerCase()}`}>
          <h5 className="text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-800 underline transition-colors">
            View All
          </h5>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );

  // Render the item rows
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center">
        Our Featured Products
      </h2>
      {itemRows.map((row, index) => (
        <ItemRow key={index} title={row.title} items={row.items} />
      ))}
    </section>
  );
};

export default Featureproduct;
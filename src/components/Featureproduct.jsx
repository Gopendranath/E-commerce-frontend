import React from 'react'
import { fetchProducts } from '../redux/slices/productSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCard from './Productcard'

const Featureproduct = () => {
  const [electronics, setElectronics] = React.useState([]);
  const [jewelry, setJewelry] = React.useState([]);
  const [clothing, setClothing] = React.useState([]);

  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  React.useEffect(() => {
    const filteredElectronics = (items.filter((product) => product.category === 'electronics')).sort((a, b) => b.rating.rate - a.rating.rate);
    const filteredJewelry = (items.filter((product) => product.category === 'jewelery')).sort((a, b) => b.rating.rate - a.rating.rate);
    const filteredClothing = [
      ...items.filter((product) => product.category === "men's clothing").slice(0, 2),
      ...items.filter((product) => product.category === "women's clothing").slice(0, 2),
    ].sort((a, b) => b.rating.rate - a.rating.rate);    

    setElectronics(filteredElectronics.slice(0, 4));
    setJewelry(filteredJewelry.slice(0, 4));
    setClothing(filteredClothing);
  }, [items]);

  if (status === 'loading') {
    return <div className='flex justify-center items-center min-h-[300px]'>
      <div className='text-center text-xl text-gray-600'>Loading...</div>
    </div>;
  }

  if (status === 'failed') {
    return <div className='flex justify-center items-center min-h-[300px]'>
      <div className='text-center text-xl text-red-500'>Error loading products</div>
    </div>;
  }

  const itemrows = [
    { title: 'Electronics', items: electronics },
    { title: 'Jewelry', items: jewelry },
    { title: 'Clothing', items: clothing },
  ];

  const ItemRow = ({ title, items }) => (
    <div className='mb-8'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-xl font-bold'>{title}</h3>
        <Link to={`/feature/${title.toLowerCase()}`}>
          <h5 className='text-sm font-semibold text-purple-600 hover:text-purple-800 underline transition-colors'> View All</h5>
        </Link>
      </div>
      {/* Updated grid to ensure 2 items per row on all screen sizes */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6'>
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-3xl font-bold mb-8 text-center'>Our Featured Products</h2>

      {itemrows.map((row, index) => (
        <ItemRow key={index} title={row.title} items={row.items} />
      ))}
    </div>
  )
}

export default Featureproduct
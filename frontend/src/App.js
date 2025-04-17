import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarsCard from './CarsCard';

const App = () => {
  // State hooks
  const [cars, setCars] = useState([]);
  const [cart, setCart] = useState([]); // Indkøbskurv tilstand
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook for at hente biler fra backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/cars')
      .then(response => {
        setCars(response.data); 
        setLoading(false);  // Ændre loading status
      })
      .catch(err => {
        setError(err);  // Hvis fejl, gem fejlinformation
        setLoading(false);  // Ændre loading status
      });
  }, []);  // Tomt array sikrer, at det kun kører én gang ved første render

  const handleAddToCart = (car) => { 
    setCart([...cart, car]); // Tilføj bil til indkøbskurven
  }

  // Hvis dataene stadig hentes, vis en loading besked
  if (loading) {
    return <div>Loading...</div>;
  }

  // Hvis der er en fejl, vis fejlbeskeden
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Cars Webshop</h1>
      <div className="cars">
        {cars.map(car => (
          <CarsCard key={car.id} car={car} onAddToCart={handleAddToCart} />
        ))}
      </div>

      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((car, index) => (
          <li key={car.id}>{car.name} - {car.model} - Price: {car.price}</li>
        ))}
      </ul>
      <button onClick={() => alert('Proceeding to checkout')}>Checkout</button>
    </div>
  );
};

export default App;

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

  // Håndter tilføjelse af bil til indkøbskurv
  const handleAddToCart = (car) => { 
    const updatedCart = [...cart];
    const existingCarIndex = updatedCart.findIndex(item => item.id === car.id);
    
    if (existingCarIndex === -1) {
      updatedCart.push(car);  // Tilføj bil til kurven, hvis den ikke findes
    } else {
      // Hvis bilen allerede er i kurven, kan du opdatere antal eller bare ignorere
      alert("This car is already in your cart!");
    }

    setCart(updatedCart);
  };

  // Hvis dataene stadig hentes, vis en loading besked
  if (loading) {
    return <div>Loading...</div>;
  }

  // Hvis der er en fejl, vis fejlbeskeden
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Beregn samlet pris i indkøbskurv
  const totalPrice = cart.reduce((total, car) => total + car.price, 0);

  return (
    <div>
      <h1>Cars Webshop</h1>
      <div className="cars">
        {cars.map(car => (
          <CarsCard key={car.id} car={car} onAddToCart={handleAddToCart} />
        ))}
      </div>

      <h2>Shopping Cart</h2>
      {cart.length > 0 ? (
        <div>
          <ul>
            {cart.map((car, index) => (
              <li key={car.id}>
                Name: {car.name} - Model: {car.model} - Price: {car.price}
              </li>
            ))}
          </ul>
          <div>
            <h3>Total: {totalPrice} DKK</h3>
            <button onClick={() => alert('Proceeding to checkout')}>Checkout</button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default App;

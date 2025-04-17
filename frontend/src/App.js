import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  // State hooks
  const [cars, setCars] = useState([]);  // 'getCars' skal ændres til 'setCars'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook for at hente biler fra backend
  useEffect(() => {
    axios.get('http://localhost:3001/api/cars')
      .then(response => {
        setCars(response.data);  // 'getCars' skal ændres til 'setCars'
        setLoading(false);  // Ændre loading status
      })
      .catch(err => {
        setError(err);  // Hvis fejl, gem fejlinformation
        setLoading(false);  // Ændre loading status
      });
  }, []);  // Tomt array sikrer, at det kun kører én gang ved første render

  // Hvis dataene stadig hentes, vis en loading besked
  if (loading) {
    return <div>Loading...</div>;
  }

  // Hvis der er en fejl, vis fejlbeskeden
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Returner listen af biler
  return (
    <div>
      <h1>Cars</h1>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            {car.name} - {car.model}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

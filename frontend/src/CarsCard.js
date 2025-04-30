import React from "react";

const CarsCard = ({ car, onAddToCart }) => { 
    return (
        <div className="card">
        <h3>{car.name}</h3>
        <p>{car.model}</p>
        <p>{car.price} DKK</p>
        <button onClick={() => onAddToCart(car)}>Add to Cart</button>
        </div>
    );
}
export default CarsCard;
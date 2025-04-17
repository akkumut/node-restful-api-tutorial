const express = require('express');
const cors = require('cors');
const app = express();

// Brug CORS middleware
app.use(cors());

// Middleware til at håndtere JSON
app.use(express.json());


// ----- CAR ROUTES -----
// Opret en router for bil-ruterne
const carRouter = express.Router();

// Simuleret bil-database
let cars = [
    { id: 3, name: 'Mercedes', model: 'A-Class', price: 300000 },
    { id: 4, name: 'Mercedes', model: 'B-Class', price: 400000 },
    { id: 5, name: 'Mercedes', model: 'C-Class', price: 500000 }
];

// GET route for at hente alle biler
carRouter.get('/', (req, res) => {
    res.json(cars);
});

// POST route for at tilføje en ny bil
carRouter.post('/', (req, res) => {
    const newCar = {
        id: cars.length + 1,
        ...req.body
    };
    cars.push(newCar);
    res.status(201).json(newCar);
});

// PUT route for at opdatere en bil
carRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedCar = req.body;
    let car = cars.find(c => c.id == id);

    if (car) {
        car.name = updatedCar.name;
        car.model = updatedCar.model;
        car.price = updatedCar.price;
        res.json(car);
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

// DELETE route for at slette en bil
carRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const carIndex = cars.findIndex(c => c.id == id);

    if (carIndex !== -1) {
        cars.splice(carIndex, 1); // Fjern bilen fra arrayet
        res.status(204).send(); // Returner en successtatus uden data
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

app.use('/api/cars', carRouter);

// ----- KUNDE ROUTES -----
const customerRouter = express.Router();

let customers =  [
{ id: 1, name: 'Sofie', email: 'sofie@example.com' },
{ id: 2, name: 'Jakob', email: 'jakob@example.com'},
{ id: 3, name: 'Jan', email: 'jan@example.com'}
];

customerRouter.get('/', (req, res) => {
    res.json(customers);
});
customerRouter.post('/', (req, res) => {
    const newCustomer = {
        id: customers.length + 1,
        ...req.body
    };
    customers.push(newCustomer);
    res.status(201).json(newCustomer);
});
app.use('/api/customers', customerRouter);


// ----- ORDER ROUTES -----
const orderRouter = express.Router();
let orders = [ ]

orderRouter.get('/', (req, res) => {
    res.json(orders);
}
);
orderRouter.post('/', (req, res) => {
    const newOrder = {
        id: orders.length + 1,
        ...req.body
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
}
);
orderRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const orderIndex = orders.findIndex(o => o.id == id);

    if (orderIndex !== -1) {
        orders.splice(orderIndex, 1); // Fjern ordren fra arrayet
        res.status(204).send(); // Returner en successtatus uden data
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});
app.use('/api/orders', orderRouter);

module.exports = app;

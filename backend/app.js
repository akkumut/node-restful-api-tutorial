const express = require('express');
const cors = require('cors');
const app = express();

// Brug CORS middleware
app.use(cors());

// Middleware til at håndtere JSON
app.use(express.json());

// Opret en router for bil-ruterne
const carRouter = express.Router();

// Simuleret bil-database
let cars = [
    { id: 1, name: 'BMW', model: 'X5' },
    { id: 2, name: 'Audi', model: 'A6' },
    { id: 3, name: 'Mercedes', model: 'A-Class' },
    { id: 4, name: 'Mercedes', model: 'B-Class' },
    { id: 5, name: 'Mercedes', model: 'C-Class' }
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

// Kør serveren på port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

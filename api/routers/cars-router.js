const express = require('express');
const db = require('../../data/db-config');

const router = express.Router();

// CREATE
router.post('/', validatePostBody, (req, res) => {
    const newCar = req.body;
    db('cars').insert(newCar)
        .then(succ => res.status(201).json({ message: `Success! New vehicle ID: ${succ[0]}` }))
        .catch(err => res.status(500).json(err))
});

// READ
router.get('/', (req, res) => {
    db('cars')
        .then(cars => res.status(200).json(cars))
        .catch(() => res.status(500).json({ error: 'Internal server error' }))
});

// Middleware
function validatePostBody(req, res, next) {
    const newCar = req.body;
    if (!newCar.VIN || !newCar.make || !newCar.model || !newCar.mileage) {
        res.status(400).json({ error: 'Please include a VIN(string), make(string), model(string), and mileage(int) with your request' });
    } else {
        next();
    }
}

module.exports = router;

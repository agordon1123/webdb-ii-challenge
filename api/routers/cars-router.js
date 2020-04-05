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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('cars').where({ id })
        .then(car => res.status(200).json(car))
        .catch(err => res.status(500).json(err))
});

// UPDATE
router.put('/:id', validatePostBody, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('cars').where({ id })
        .update(changes)
        .then(succ => res.status(201).json(succ))
        .catch(err => res.status(500).json(err))
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('cars').where({ id })
        .del()
        .then(succ => {
            if (succ ===1) {
                res.status(200).json({ message: `Vehicle with the ID: ${id} successfully deleted from the database` })
            } else {
                res.status(500).json({ error: 'There was an error with your request' })
            }
        })
        .catch(err => res.status(500).json(err))
});

// Middleware
function validatePostBody(req, res, next) {
    const newCar = req.body;
    if (!newCar.VIN || !newCar.make || !newCar.model || !newCar.mileage) {
        res.status(400).json({ error: 'Please include a VIN(string), make(string), model(string), and mileage(int) with your request' });
    } else {
        next();
    }
};

module.exports = router;

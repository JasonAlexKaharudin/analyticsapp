const express = require('express');
const router = express.Router(); 
const Performance = require('../models/performance')

// Create one
router.post('/', async (req, res) => {
    const performanceData = new Performance({
        timing_obj: req.body.timing_obj,
        start_time: req.body.start_time,
        end_time: req.body.end_time, 
        total_load_time: req.body.total_load_time
    })
    try {
        const newData = await performanceData.save()
        res.status(201).json(newData)
    } catch (err){
        res.status(400).json(err.message)
    }
});

// Get all
router.get('/', async (req, res) => {
    try {
        const data = await (Performance.find())
        res.json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Get one
router.get('/:id', async (req, res) => {
    const data = await (Performance.findById(req.params.id))
    res.json(data)
});


// get timing_obj
router.get('/timing_obj', async (req, res) => {
    try{
        const perfData = await (Performance.findById(req.params.timing_obj))
        res.json(perfData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get start_time
router.get('/start_time', async (req, res) => {
    try{
        const perfData = await (Performance.findById(req.params.start_time))
        res.json(perfData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get start_time
router.get('/end_time', async (req, res) => {
    try{
        const perfData = await (Performance.findById(req.params.end_time))
        res.json(perfData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get total_load_time
router.get('/total_load_time', async (req, res) => {
    try{
        const perfData = await (Performance.findById(req.params.total_load_time))
        res.json(perfData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Update one
router.put('/:id', async (req, res) => {
    const data = await (Performance.findById(req.params.id))
    if (req.body.timing_obj != null){
        data.timing_obj = req.body.timing_obj
    }
    if (req.body.start_time != null){
        data.start_time = req.body.start_time
    }
    if (req.body.end_time != null){
        data.end_time = req.body.end_time
    }
    if (req.body.total_load_time != null){
        data.total_load_time = req.body.total_load_time
    }
   
    try {
        const updated = await data.save()
        res.json({updated})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Delete one
router.delete('/:id', async (req, res) => {
    try {
        await Performance.findById(req.params.id).deleteOne()
        res.json({message: 'Deleted Successfully'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router
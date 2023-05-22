const express = require('express');
const router = express.Router(); 
const Activity = require('../models/activity')

// Create one
router.post('/', async (req, res) => {
    const activityData = new Activity({
        cursor_x: req.body.cursor_x,
        cursor_y: req.body.cursor_y,
        mouse_click: req.body.mouse_click,
        key_click: req.body.key_click,
        break_ended: req.body.break_ended,
        break_duration: req.body.break_duration,
    })
    try {
        const newData = await activityData.save()
        res.status(201).json(newData)
    } catch (err){
        res.status(400).json(err.message)
    }
});

// Get all
router.get('/', async (req, res) => {
    try {
        const data = await (Activity.find())
        res.json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


// Get one
router.get('/:id', async (req, res) => {
    const data = await (Activity.findById(req.params.id))
    res.json(data)
});

// get cursor_x
router.get('/cursor_x', async (req, res) => {
    try{
        const activeData = await (Activity.findById(req.params.id))
        res.json(activeData.cursor_x)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get cursor_y
router.get('/cursor_y', async (req, res) => {
    try{
        const activeData = await (Activity.findById(req.params.id))
        res.json(activeData.cursor_y)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get cmouse_click
router.get('/mouse_click', async (req, res) => {
    try{
        const activeData = await (Activity.findById(req.params.mouse_click))
        res.json(activeData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/key_click', async (req, res) => {
    try{
        const activeData = await (Activity.findById(req.params.key_click))
        res.json(activeData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/break_ended', async (req, res) => {
    try{
        const activeData = await (Activity.findById(req.params.break_ended))
        res.json(activeData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/break_duration', async (req, res) => {
    try{
        const activeData = await (Activity.findById(req.params.break_duration))
        res.json(activeData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


// Update one
router.put('/:id', async (req, res) => {
    const data = await (Activity.findById(req.params.id))
    if (req.body.cursor_x != null){
        data.cursor_x = req.body.cursor_x
    }
    if (req.body.cursor_y != null){
        data.cursor_y = req.body.cursor_y
    }
    if (req.body.mouse_click != null){
        data.mouse_click = req.body.mouse_click
    }
    if (req.body.key_click != null){
        data.key_click = req.body.key_click
    }
    if (req.body.break_ended != null){
        data.break_ended = req.body.break_ended
    }
    if (req.body.break_duration!= null){
        data.break_duration = req.body.break_duration
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
        await Activity.findById(req.params.id).deleteOne()
        res.json({message: 'Deleted Successfully'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router

const express = require('express');
const router = express.Router(); 
const Static = require('../models/static')

// Create one
router.post('/', async (req, res) => {
    const staticData = new Static({
        useragentString: req.body.useragentString,
        userLang: req.body.userLang,
        cookie_enabled: req.body.cookie_enabled,
        width: req.body.width, 
        height: req.body.height, 
        innerHeight: req.body.innerHeight,  
        innerWidth: req.body.innerWidth,  
        outerHeight: req.body.outerHeight, 
        outerWidth: req.body.outerWidth, 
        connection_Type: req.body.connection_Type
    })
    try {
        const newStatic = await staticData.save()
        res.status(201).json(newStatic)
    } catch (err){
        res.status(400).json(err.message)
    }
});


// get user agent string
router.get('/userAgent', async (req, res) => {
    try{
        const staticData = await (Static.find(req.params.useragentString))
        res.json(staticData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get user language
router.get('/userLang', async (req, res) => {
    try{
        const staticData = await (Static.find(req.params.userLang))
        res.json(staticData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get cookie
router.get('/cookie_enabled', async (req, res) => {
    try{
        const staticData = await (Static.findById(req.params.cookie_enabled))
        res.json(staticData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get width
router.get('/width', async (req, res) => {
    try{
        const staticData = await (Static.findById(req.params.width))
        res.json(staticData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get height
router.get('/height', async (req, res) => {
    try{
        const staticData = await (Static.findById(req.params.height))
        res.json(staticData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get innerheight
router.get('/innerHeight', async (req, res) => {
    try{
        const staticData = await (Static.findById(req.params.innerHeight))
        res.json(staticData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get innerWidth
router.get('/innerWidth', async (req, res) => {
    try{
        const staticData = await (Static.findById(req.params.innerWidth))
        res.json(staticData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//get outerHeight
router.get('/outerHeight', async (req, res) => {
    try{
        const staticData = await (Static.findById(req.params.outerHeight))
        res.json(staticData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//get outerWidth
router.get('/outerWidth', async (req, res) => {
    try{
        const staticData = await (Static.findById(req.params.outerWidth))
        res.json(staticData.outerWidth)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//get connection_type
router.get('/connection_Type', async (req, res) => {
    try{
        const staticData = await (Static.findById(req.params.connection_Type))
        res.json(staticData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


// Get all
router.get('/', async (req, res) => {
    try {
        const statics = await (Static.find())
        res.json(statics)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Get one
router.get('/:id', async (req, res) => {
    try{
        const staticData = await (Static.findById(req.params.id))
        res.json(staticData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});



// Update one
router.put('/:id', async (req, res) => {
    const staticData = await (Static.findById(req.params.id))
    if (req.body.useragentString != null){
        staticData.useragentString = req.body.useragentString
    }
    if (req.body.userLang != null){
        staticData.userLang = req.body.userLang
    }
    if (req.body.width != null){
        staticData.width = req.body.width
    }
    if (req.body.height != null){
        staticData.height = req.body.height
    }
    if (req.body.innerHeight != null){
        staticData.innerHeight = req.body.innerHeight
    }
    if (req.body.innerWidth != null){
        staticData.innerWidth = req.body.innerWidth
    }
    if (req.body.outerHeight != null){
        staticData.outerHeight = req.body.outerHeight
    }
    if (req.body.outerWidth != null){
        staticData.outerWidth = req.body.outerWidth
    }
    if (req.body.connection_Type != null){
        staticData.connection_Type = req.body.connection_Type
    }
    try {
        const updated = await staticData.save()
        res.json({updated})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Delete one
router.delete('/:id', async (req, res) => {
    try {
        await Static.findById(req.params.id).deleteOne()
        res.json({message: 'Deleted Successfully'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router

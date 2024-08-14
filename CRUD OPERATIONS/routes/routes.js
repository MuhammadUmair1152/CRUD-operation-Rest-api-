const express = require('express');
const Model = require('../model/model');
const router = express.Router();

// Post Method
router.post('/post', async (req, res) => {
    console.log('Request Body:', req.body);
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
    console.log(data);
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
// Get all Method
router.get('/getAll', async (req, res) => {
    console.log();
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// router.post('/post', (req, res) => {
//     res.send('postt');
// });


// Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const data = await Model.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json({ message: "Data deleted successfully" });
        console.log("Data deleted",req.params.id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

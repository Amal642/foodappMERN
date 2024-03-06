const express = require('express');
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try {
        res.send([global.food_items,global.foodCat])
    } catch (error) {
        
    }
})

module.exports=router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const jwtSecret="LearningByPracticingisthebestwayconfirmed"

router.post("/createuser", [
    body('email', 'must be an email').isEmail(),
    body('password', 'min length 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const salt=await bcrypt.genSalt(10);
    let secPswd=await bcrypt.hash(req.body.password,salt);
    try {
        const newUser = new User({
            name: req.body.name,
            password: secPswd,
            email: req.body.email,
            location: req.body.location
        });
        await newUser.save();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

router.post("/loginuser", [
    body('email', 'must be an email').isEmail(),
    body('password', 'min length 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            // alert("Please enter correct creds");
            return res.status(400).json({ errors: "Enter correct Creds" });
        }
        const pwd=await bcrypt.compare(req.body.password,userData.password);
        if(!pwd)
        return res.status(400).json({ errors: "Enter correct Creds" });
        // await newUser.save();

        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret)
        return res.json({ success: true ,authToken:authToken});

        // res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../db/conn');
const User = require("../model/userSchema")

router.get('/', (req, res) => {
    res.send('Hello from server router js')
})

// router.post('/register', (req, res) => {

//     const { name, email, phone, password, cpassword} = req.body; 

//     if(!name || !email || !phone || !password || !cpassword)
//     {
//         return res.status(422).json({error: "Please fill the required details"});
//     }

//     User.findOne({email: email})
//     .then((userExist) => {
//         if(userExist) {
//             return res.status(422).json({ error: "User with that email address already exists"});
//         }

//         const user = new User({ name, email, phone, password, cpassword });

//         user.save().then(() => {
//             res.status(201).json({ message: "user registered successfully" })
//         }).catch((err) => res.status(500).json({ error: "Registration failed"}))


//     }).catch(err => {console.log(err); });

//     // console.log(req.body); 
//     //res.json({ message: req.body });
//     // res.send("this is register page");
// })

router.post('/register', async (req, res) => {

    const { name, email, phone, password, cpassword} = req.body; 

    if(!name || !email || !phone || !password || !cpassword)
    {
        return res.status(422).json({error: "Please fill the required details"});
    }

    try{

        
       const userExist = await User.findOne({email: email})
       
       if(userExist) {
            return res.status(422).json({ error: "User with that email address already exists"});
       } else if(password != cpassword) {
            return res.status(422).json({ error: "Password does not match"});
       } 

       const user = new User({ name, email, phone, password, cpassword});

       await user.save();

       res.status(201).json({ message: "user registered successfully" })

        // console.log(req.body); 
        //res.json({ message: req.body });
        // res.send("this is register page");

    } catch(err) {

        console.log(err);

    }

})

//login route

router.post('/signin', async (req, res) => {
    //console.log(req.body);

    //res.json({ message: "this is the message"})

    try{
        let token;
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({error: "Please fill the required data"})
        }
        
        const userLogin = await User.findOne({email: email});


        if(userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            
            token = await userLogin.generateAuthToken();

            console.log(token);

            if(!isMatch) {
                res.status(400).json({ error: "Invalid credentials"});
            } else{
                res.json({message: "User login successfully"});
            }
        } else {
            res.status(400).json({ error: "Invalid credentials"});
        }
        // console.log(userLogin);
    }catch (err) {
        console.log(err);
    }

})



module.exports = router;


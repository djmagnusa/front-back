const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");


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

router.get('/getdata', authenticate, (req,res) => {
    console.log('This is getData');
    res.send(req.rootUser)
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

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000), //expire cookie in 30 days
                httpOnly: true
            });

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

//Logout page

router.get('/logout', (req, res) => {
    console.log("Hello logout");
    res.clearCookie('jwtoken', {path: '/'});
    res.status(200).send('User logout');
})



module.exports = router;


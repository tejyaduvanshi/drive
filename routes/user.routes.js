const express= require('express');
const router= express.Router();
const { body,validationResult } = require('express-validator');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')


router.get('/register',(req,res)=>{
    res.render('register');
})
router.post('/register',
    body('email').trim().isEmail().isLength({min : 8}),
    body('password').trim().isLength({min: 3}),
    body('username').trim().isLength({min: 3}),
    async (req,res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }
        const { email , username , password }=req.body
        console.log(username)
        console.log(password)
        console.log(email)


        const hashPassword = await bcrypt.hash(password, 10)
        
        const newUser = await userModel.create({
            email,
            username,
            password:hashPassword
        })
        
        
        res.json({newUser})
   
        
     

    }
)

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',
    body('username').trim().isLength({min : 3}),
    body('password').trim().isLength({min : 3})
    , async(req,res)=>{

        const errors = validationResult(res)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Invalid  details'
            })
        }

        const{username , password} = req.body

        const user =await userModel.findOne({
            username : username
        })

        if(!user){
            return res.status(400).json({
                errors: errors.array(),
                message:'Invalid username and password'
            })
        }

        const ismatch = await bcrypt.compare(password, user.password)

        if(!ismatch){
            return res.status(400).json({
                errors: errors.array(),
                message:'Invalid username and password'
            })
        }

        const token = jwt.sign({
            username: user.username,
            email: user.email,
            userId: user._id
        }, 'process.env.JWT_SECRET');


        res.cookie('cookie', token);
        res.send("logged in");


})

module.exports = router;
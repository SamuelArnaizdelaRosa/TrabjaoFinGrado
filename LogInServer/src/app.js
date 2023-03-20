require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");

const app = express();

app.use(express.json());

app.post("/register",(req,res)=>{

});

app.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;

        if(!(email&&password)){
            res.status(400).send("Requeridos todos los Inputs")
        }

        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password,user.password))){
            const token = jwt.sign(
                {user_id: user._id,email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
        }
    } catch (err){
        console.log(err);
    }
})

module.exports = app;
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../model/User.js";

const authenticate = asyncHandler(async(req,res,next)=>{
    

   let {token} = req.body;
   console.log('async handler called')
   console.log(req.body.token)

    if( token){
        try{
            const decoded = jwt.verify(token,`${process.env.JWT_SECRET}`) 
            try{  req.user = await User.findById(decoded.userId).select("-password");}catch(e){
                console.log(e)
                console.log("ccccccc")
                return req.json(e)
            }
            next();
        }catch(error){
            console.log("e22")
            console.log(error)
            res.status(401);
            throw new Error("Not authorized,token failed")
        }  
    }else{
        res.status(401);
        throw new Error("Not authorized, token not found")
    }
})

const authorizedAdmin = (req,res,next) => {
    console.log('authorization called')
    if(req.user && req.user.isAdmin){
        next();
        console.log('authorization called')

    }else{
        res.status(401).send("Not authorized as an admin")
    }
}

export {authenticate , authorizedAdmin}
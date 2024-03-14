import dotenv from 'dotenv'

import cookieParser from 'cookie-parser'


import express from 'express'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'




dotenv.config()

connectDB()

const app = express()

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

const PORT = process.env.PORT || 3000

//routes

app.use("/api/v1/users",userRoutes)


app.listen(PORT,()=>{

})


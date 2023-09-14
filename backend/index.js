import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'; // Import the cors middleware
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/userRoutes.js'
import connectDB from './Config/db.js'
dotenv.config()
import { notFound, errorHandler } from './MiddleWare/errorMiddleWare.js'
const port = process.env.PORT || 5000
connectDB()
const app = express()
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include credentials (cookies) in CORS requests
  }));
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use('/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

//POST /users => Register User
//POST /users/auth => Authenticate User
//POST /users/logout => Logout User and clear cookies
//GET /users/profile => Get User Profile
//PUT /users/profile => Update User




app.listen(port, ()=> console.log(`server started on port : ${port}`))
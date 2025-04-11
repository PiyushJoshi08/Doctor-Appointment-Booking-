import express from 'express' //type set to module because we use import
import cors from 'cors'
import 'dotenv/config' //to  use environment variable
//NOTE, MAKE TYPE=MODULE AND SERVER:NODEMON FOR AUTO UPDATES
import connectDB from './config/mongodb.js' //import connection to db
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'

//app config
const app=express()
const port=process.env.PORT || 4000 //agar hai to voh vrna 4000 (setting up port)
connectDB() //(connecting to database)
connectCloudinary() //to connect cloudinary


//middlewares
// Middleware functions in Express are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. In this case, express.json() acts as a middleware that processes incoming data before it reaches your route handlers.
app.use(express.json()) //express.json is a middleware to parse incoming request that contains json payloads
app.use(cors()) //allows connection of frontend to backend



//api endpoints
app.use('/api/admin',adminRouter) //if this endpoint then adminRouter will be used and the api controller function which is addDoctor will be executed
//localhost:4000/api/admin/add-doctor


app.get('/',(req,res)=>{
    res.send('API working ha')
})


app.listen(port,()=>console.log("Server Started",port)) //this is to start the server, it listens to this port



//WHAT MULTER
//WHAT CONTROLLER FUNCTIONS
//WHAT ROUTES
//WHAT API ENDPOINTS
//here we setup mongodb (mongodb atlas)
//dotenv has link to mongodb server

import mongoose from "mongoose";

const connectDB = async()=>{ //async because connecting to db is asynchronous opern

    mongoose.connection.on('connected',()=>console.log("Database Connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/docbook`) //creates a new database named docbook when connected
}
//when we cann mongoose.connect it return sa promise that resolves once thre conn is established

export default connectDB


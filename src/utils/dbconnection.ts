import mongoose from "mongoose"

const mongodbUri = process.env.MONGODB_URI!
if(!mongodbUri){
    throw new Error('you dont provide the mongodb connection string')
}

let cached = global.mongoose
if(!cached){
    cached = global.mongoose = {conn:null,promise:null}
}

async function connectDB(){
    
        if(cached.conn) return cached.conn;
        
        if(!cached.promise){
            const options = {
                bufferCommands:true,
                maxPoolSize:10
            }
            cached.promise = mongoose.connect(mongodbUri,options)
            .then(()=>mongoose.connection)
        }
        try {
            cached.conn = await cached.promise
        } catch (error) {
            cached.promise = null
            throw new Error(`error while connecting to db: ${error}`)
        }
    return cached.conn
}

export default connectDB;
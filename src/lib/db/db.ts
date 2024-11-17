import mongoose from "mongoose"

const dbConnect = async () =>{
    
    try {
        const dbURI = process.env.NEXT_PUBLIC_DB_URI;
        if (!dbURI) {
            throw new Error("Database URI is not defined in environment variables");
        }
    
    
        mongoose.set("strictQuery", true)
        const isconnected = false
        if(isconnected){
            console.log("already connected")
            return true;
        }
        const db = await mongoose.connect(dbURI, {
            dbName:"cloudSEK"
        })
    } catch (error) {
        
    }
//    Add db uri in .env file

}
import mongoose from "mongoose"

export const dbConnect = async () =>{
    try {
        const dbURI = process.env.NEXT_PUBLIC_DB_URI;
        console.log(dbURI)
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
    } catch (error:any) {
        return console.log("error in connecting to db", error.message);
    }
//    Add db uri in .env file

}
import { NextRequest, NextResponse } from "next/server";

const Handler = async(request:NextRequest) =>{
     if(request.method==="POST"){
      
     }
     else if(request.method==="GET"){
      
     }
     else{
        return NextResponse.json({message:"Method is not allowed"}, {status:405})
     }
}



export {Handler as GET, Handler as POST}
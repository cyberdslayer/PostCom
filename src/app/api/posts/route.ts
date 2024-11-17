// Make alll api there related to posts

import { NextRequest, NextResponse } from "next/server";

const Handler = async(request:NextRequest) =>{
    if(request.method==="POST"){
       const body = await request.json()
    //    Data sent in body
    const {} = body
    }
    else if (request.method === "GET"){

    }
    else{
        NextResponse.json({message:"Method is not allowed"},{status:405})
    }
}


export {Handler as GET , Handler as POST}
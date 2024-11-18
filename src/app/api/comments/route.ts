import { dbConnect } from "@/lib/db/db";
import schema_comments from "@/models/schema_comments";
import schema_posts from "@/models/schema_posts";
import { NextRequest, NextResponse } from "next/server";


const Handler = async(request:NextRequest) =>{
     try{
      await dbConnect()

      if(request.method==="POST"){
       const body = await request.json();
       console.log("this is body of comment", body);
 
       const {id, content} = body;
       console.log("This is id", id , "This is newComment", content);
       const result = await new schema_comments({text: content, postId:id}).save();
       if(!result){
          return NextResponse.json({message: " Unable to generate comment"}, {status: 409})
       }
       const update = await schema_posts.findOneAndUpdate({_id: id}, {$push:{comments:result._id}})
         if(!update){
            return NextResponse.json({message: " Unable to update post"}, {status: 409})
         }
         return NextResponse.json({message: "Comment generated successfully"}, {status: 200})
      }
      else if(request.method==="GET"){
       
      }
      else{
         return NextResponse.json({message:"Method is not allowed"}, {status:405})
      }
     }catch(error:any){
      return NextResponse.json({message: error.message ||  "Internal Server Error"}, {status:500});
     }
}



export {Handler as GET, Handler as POST}
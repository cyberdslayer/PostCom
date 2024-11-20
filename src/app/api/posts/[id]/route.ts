import schema_posts from '@/models/schema_posts';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';



const handler = (req: NextRequest) => {
 console.log(req)
 return NextResponse.json({message:"API is working"}, {status:200})
};

export  {handler as GET};




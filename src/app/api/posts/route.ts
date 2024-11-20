import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/db";
import schema_posts from "@/models/schema_posts";

const Handler = async (request: NextRequest) => {
  await dbConnect();
  if (request.method === "POST") {
    try {
      const body = await request.json();
      const { content, uid } = body;
      console.log("this is the body", body);

      if (!content) {
        return NextResponse.json(
          { message: "Content is required" },
          { status: 400 }
        );
      }
      const newPost = { content, uid };
      const result = await new schema_posts(newPost).save();
      return NextResponse.json(
        { message: "Post created", postId: result._id },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { message: "Error Creating Post", error: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: "Error Creating Post", error: String(error) },
        { status: 500 }
      );
    }
  } else if (request.method === "GET") {
    try {
      const posts = await schema_posts
        .find()
        .sort({ createdAt: -1 })
        .populate({
          path: "comments",
          options: { sort: { updatedAt: -1 } },
        })
        .lean();
      console.log(posts);
      return NextResponse.json(
        { data: posts, message: "fatched successfully" },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log("error in connecting to db", error.message);
        return NextResponse.json(
          { message: error.message || "Internal Server Error" },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    NextResponse.json({ message: "Method is not allowed" }, { status: 405 });
  }
};

export { Handler as GET, Handler as POST };

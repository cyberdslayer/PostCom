"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Postcom from "@/../public/postcom.png";
import { redirect } from "next/navigation";


export default function Home() {
  const goToCreatePost = () => {
    redirect("/create-post");
  }
  return (
    <div className="flex  md:flex-row flex-col h-screen justify-center items-center ">
      <div className="md:w-[50%] flex items-center justify-center ">
      {/* <h1 className="text-6xl text-cyan-800 font-bold ">Postcom </h1>  */}
      <Image src={Postcom} width={600} height={600} alt="Logo" className="border-red-600 rounded-xl"/>

      </div>

      <div className=" flex flex-col items-center md:w-[50%]">
      <h1 className="text-6xl text-cyan-800 font-bold mb-4 ">Postcom </h1>
      <div>
        {/* <h2 className="text-4xl text-cyan-800 ">Welcome to Postcom</h2> */}
        <p className="text-2xl text-cyan-800 font-bold ">A platform to share your thoughts and ideas</p>
      </div>
        {/* <Image src={Postcom} width={400} height={400} alt="Logo" className="border-red-600 rounded-xl"/> */}
        <div className="flex flex-col mr-5 w-[40vw] gap-4 my-6">
          <Button 
          className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-4 px-6"
          onClick={goToCreatePost}
          >
            Create a post
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-4 px-6 ">
            Explore existing posts
          </Button>
        </div> 
      </div>
    </div>
  );
}

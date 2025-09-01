import { HeroScrollDemo } from "@/components/HeroScrool";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Highlighter } from "@/components/magicui/highlighter";

import { MarqueeDemo } from "@/components/Testimonials";

import Information from '@/components/Information';
import UserAuthClientComponent from "./checkUser";


export default function Home() {
  
  
  return (
    <div className="w-full h-screen text-[#374151]  dark:dark:text-slate-100">
     <UserAuthClientComponent/>
    <div>
      <div className="w-[90vw] mx-auto flex flex-col justify-center items-center mt-15  gap-9">

        <h1 className="font-heading text-5xl  ">Stop{" "}
          <Highlighter action="underline" color="#FF9800" >Wondering{" "}
            </Highlighter>{" "}
              Where Your Money{" "}
              <Highlighter action="highlight" color="#87CEFA">
                Goes
                </Highlighter>{" "} </h1>
        <p className="font-accent text-[20px] ">Get crystal-clear insights into your spending habits with smart expense tracking that actually works.
</p>
  <AnimatedShinyText>
<p className="font-sans font-bold text-[19px] text-amber-500">
    💸 See your spending patterns →
    </p>
    </AnimatedShinyText>
      </div>
      <div className="mt-[-75px] ">
      <HeroScrollDemo/> 
      </div>
      <div className="mt-[-76px] flex flex-col  items-center gap-6">
        <h2 className="text-4xl  font-heading text-blue-600 ">What Our Users Says</h2>
        <div className="border w-[50vw] mx-auto border-amber-500 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"></div>
       <MarqueeDemo/>

      </div>
      <div className="w-[90vw] mx-auto mt-12 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-2xl p-4 bg-gray-100 dark:bg-black " >
        <h1 className="text-2xl font-bold text-gray-950 dark:text-slate-100 mb-5">Frequently Asked Questions :</h1>
        <Information/>
      </div>



    </div>

   </div>
  )
}

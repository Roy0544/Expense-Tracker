import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { AnimatedThemeToggler } from './magicui/animated-theme-toggler'

function Navbar() {
  return (
    <div>
      <div className= ' shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] w-[90vw] h-14 mx-auto flex justify-between items-center rounded-md px-4 '>
      <div id="left"><p className='text-2xl font-sans font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent'>TrackFlow</p></div>
      <div id="right" className='font-sans font-bold'>
        <div className='flex gap-4 text-[18px]'>
          <Link href='/home'>
          <button>Home</button>
          </Link>
           <AnimatedThemeToggler/>
          {/* <p className='text-2xl font-sans font-bold'>right here</p> */}
          <Button variant="outline" className={'bg-amber-500 text-white font-bold text-[18px] font-sans dark:bg-amber-500'}>Log In</Button>
          <Button variant={"outline"} className={'bg-blue-400 text-white font-bold text-[16px] font-sans dark:bg-blue-400'}>Sign Up</Button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

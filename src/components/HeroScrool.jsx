"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import image from '../../public/expensetrackerdashboard.png'


export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
               <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none font-accent">
                Have A Look
              </span>
            </h1>
          </>
        }>
        <img
          src="../../public/expensetrackerdashboard.png"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>
  );
}

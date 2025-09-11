"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { useSelector } from "react-redux";

export function HeroScrollDemo() {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <div className="md:flex flex-col overflow-hidden hidden">
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
        }
      >
        <img
          src={!theme ? "hero1.png" : "hero.png"}
          alt="hero"
          height={720}
          width={1600}
          className="mx-auto rounded-2xl object-cover h-full object-[-45px]"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

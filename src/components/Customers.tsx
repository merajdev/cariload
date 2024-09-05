"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import userImage from "/public/images/user.png";

const people = [
  {
    id: 1,
    name: "John Doe",
    image: userImage as any
  },
  {
    id: 2,
    name: "Robert Johnson",
    image: userImage as any
  },
  {
    id: 3,
    name: "Jane Smith",
    image: userImage as any
  },
];

export function Customers() {
  return (
    <div className="flex flex-row items-center mb-6 w-full">
      <AnimatedTooltip items={people} />
      <div className="text-neutral-100 ms-6">
        <h5 className="text-xs md:text-xl font-bold">
          Customer Satisfied
        </h5>
        <p className="text-xs md:text-sm font-bold">
          4.8 (15k Reviews)
        </p>
      </div>
    </div>
  );
}

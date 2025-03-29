"use client";
import { useState } from "react";
import Ptable from "./Ptable";
// import Bar from "./Bar";
import Bar from "./Bar";
import Heading from "@/components/Heading";

const Pr = () => {
   
    return (
        <div className="bg-[#FBFCFF] w-full h-fit">
            {/* Header */}
            <Heading text="Production Rate" />

         

            {/* Action Bar */}
            <Bar />


            {/* Table */}
            <Ptable />
        </div>
    );
};

export default Pr;

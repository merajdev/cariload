import { HoverEffect } from "@/components/ui/card-hover-effect";
import { BsDashLg } from "react-icons/bs";
import freightBrokerage from "/public/images/freightBrokerage.jpg";
import transportation from "/public/images/transportation.jpg";
import warehousing from "/public/images/warehousing.jpg";
import drivingTraining from "/public/images/drivingTraining.jpg";

export function Servicesection() {
    return (
        <div className="md:w-8/12 mx-auto px-4">
            <div className="flex flex-col items-center">
                <h5 className="text-xs font-bold flex items-center mb-3 text-neutral-500">
                    <BsDashLg className="text-3xl text-indigo-500 me-2" />
                    OUR SERVICE
                    <BsDashLg className="text-3xl text-indigo-500 ms-2" />
                </h5>
                <h1 className="max-w-lg text-center text-2xl md:text-4xl font-bold mb-4 text-neutral-800 leading-10 tracking-wide">
                    Provide Efficient Logistics
                    Solutions  <span className="text-indigo-500">Business</span>
                </h1>

            </div>
            <HoverEffect items={projects} />
        </div>
    );
}
export const projects = [
    {
        title: "Freight Brokerage",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Nullam nec nunc nec nunc.",
        link: "#",
        image: freightBrokerage.src,
    },
    {
        title: "Transportation",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Nullam nec nunc nec nunc.",
        link: "#",
        image: transportation.src,
    },
    {
        title: "Warehousing",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Nullam nec nunc nec nunc.",
        link: "#",
        image: warehousing.src,
    },
    {
        title: "Driving Training",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Nullam nec nunc nec nunc.",
        link: "#",
        image: drivingTraining.src,
    },
];

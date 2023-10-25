import React from 'react';
import {motion} from "framer-motion";
import {HSlider } from "../components"

const HotelSlider = () => {
  return (
    <motion.div className="w-full flex items-start justify-start flex-col">
        <div className="w-full flex items-center justify-between">
            <div className="flex flex-col items-start justify gap-1">
                <p className="text-2xl text-headingColor font-bold">
                    Our Best Locations
                </p>
                <div className="w-40 h-1 rounded-md bg-orange-500"></div>

            </div>

        </div>
        <HSlider/>
    </motion.div>
  )
}

export default HotelSlider
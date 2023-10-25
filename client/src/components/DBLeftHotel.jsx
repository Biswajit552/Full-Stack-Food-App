import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActivestyles } from "../utils/styles";

const DBLeftHotel = () => {
  return (
    <div
      className="h-full py-12 flex flex-col bg-cardOverlay 
    backdrop-blur-md shadow-md min-w-210 w-300 gap-3"
    >
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={Logo} className=" w-12" alt="" />
        <p className="font-semibold text-xl">City</p>
      </NavLink>

      <hr />
      <ul className="flex flex-col gap-4">
        <NavLink
          to={"/dashboardHotel/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActivestyles
          }
        >
          Home
        </NavLink>

        <NavLink
          to={"/dashboardHotel/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActivestyles
          }
        >
          Orders
        </NavLink>
        <NavLink
          to={"/dashboardHotel/hotels"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActivestyles
          }
        >
          Hotels
        </NavLink>
        <NavLink
          to={"/dashboardHotel/newhotels"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActivestyles
          }
        >
          Add New Hotels
        </NavLink>
        
        <NavLink
          to={"/dashboardHotel/photos"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActivestyles
          }
        >
            Photos
          
        </NavLink>
      </ul>
       <div className="w-full items-center justify-center flex h-225 mt-auto px-2">
        <div className="w-full h-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-3 px-3">
          <div className="w-12 h-12 border bg-white rounded-full flex items-center justify-center">
            <p className="text-2xl font-bold text-red-500">?</p>
          </div>
          <p className="text-xl text-primary font-semibold">Help Center</p>
          <p className="text-base text-gray-300 text-center">Having trouble in city. Please contact us for more questions</p>
          <p className="px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer">Get in touch</p>
        </div>
       </div>
    </div>
  );
};

export default DBLeftHotel;

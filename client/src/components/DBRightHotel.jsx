import React from 'react'
import {DBAddHotel, DBBookings, DBHeader, DBHome, DBHotelHome, DBHotelItem, DBItems, DBOrders, DBUsers} from '../components'
import { Route, Routes } from 'react-router-dom'

const DBRightHotel = () => {
  return (
    <div  className="flex flex-col px-12 py-12 flex-1 h-full">
      <DBHeader/>
      <div className=" flex flex-col flex-1 overflow-y-scroll scrollbar-none " >
        <Routes>
           <Route path="/home" element={<DBHotelHome/>} />
           <Route path="/orders" element={<DBBookings/>} />
           <Route path="/hotels" element={<DBHotelItem/>} />
           <Route path="/newhotels" element={<DBAddHotel/>} />
           <Route path="/photos" element={<DBUsers/>} />
        </Routes>
      </div>
    </div>
  )
}

export default DBRightHotel
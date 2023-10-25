import React, { useEffect } from 'react'
import {useDispatch, useSelector}  from "react-redux"
import { getAllBooking, getAllOrder } from '../api';
import {setBookings } from "../context/actions/bookingActions"
import {BookingData, OrderData} from '../components';

const DBBookings = () => {
  const bookings = useSelector((state)=> state.bookings)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!bookings){
      getAllBooking().then((data)=>{
        dispatch(setBookings(data));
      });
    }
  },[]);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full gap-4">
      {bookings ? (
      <>{bookings.map((item, i)=>(
        <BookingData key={i} index={i} data={item} admin={true}/>
      ))}  </>
      ):(
      <>
      <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
      </>)}
    </div>
  )
}

export default DBBookings
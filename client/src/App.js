import React, { useEffect, useState } from 'react';
import {motion} from "framer-motion"
import {getAuth} from "firebase/auth"
import {Route , Routes} from "react-router-dom"
import { Dashboard, DashboardHotel, Hotel, Login, Main } from './containers';
import { useDispatch, useSelector } from 'react-redux';
import { app } from './config/firebase.config';
import { getAllBookItems, getAllCartItems, validateUserJWTToken } from './api';
import {setUserDetails} from "./context/actions/userActions";
import {fadeInOut} from "./animations"
import { AboutUs, Alert, CheckOutSuccess, MainLoader, UserOrder } from './components';
import { setCartItems } from './context/actions/cartActions';
import { setBookItems } from './context/actions/bookActions';


const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);

const alert = useSelector(state => state.alert);

  const dispatch = useDispatch();


  useEffect (()=>{
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          // console.log(token)
          validateUserJWTToken(token).then((data) => {
            if (data){
              getAllCartItems(data?.user_id).then((items)=>{
                console.log(items)
                dispatch(setCartItems(items));
              });
            }
            if (data){
              getAllBookItems(data?.user_id).then((books)=>{
                console.log(books)
                dispatch(setBookItems(books));
              });
            }
            dispatch(setUserDetails(data));
          });
          // navigate("/",{replace:true});
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });


  },[])

  return (
    <div className="  w-screen min-h-screen h-auto flex flex-col items-center justify-center ">
    {isLoading && (
      <motion.div
        {...fadeInOut}
        className=" fixed z-50 inset-0 bg-cardOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader/>
      </motion.div>
    )}
      
      <Routes>
          <Route path="/*" element={<Main/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard/*" element={<Dashboard/>} />
          <Route path="/dashboardHotel/*" element={<DashboardHotel/>} />
          <Route path="/checkout-success/" element={<CheckOutSuccess/>} />
          <Route path="/user-orders" element={<UserOrder/>} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/Hotel" element={<Hotel/>} />
      </Routes>
        {alert?.type && <Alert type={alert?.type} message={alert?.message} />} 
      </div>
  )
}


export default App
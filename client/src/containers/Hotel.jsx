import React, { useEffect } from "react";
import { Cart, Header,  HotelCart,  HotelFilter,  HotelSlider, Hotelhome } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../api";
import { setAllhotels } from "../context/actions/hotelActions";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

const Main = () => {
  const hotels = useSelector((state) => state.hotels);
  const isbook = useSelector((state) => state.isbook);

  const dispatch = useDispatch();
  useEffect(()=>{
    if(!hotels){
      getAllHotels().then((data)=>{
        dispatch(setAllhotels(data));
      });
    }
  },[])

  //cart 
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);

  useEffect(()=>{
    if(!products){
      getAllProducts().then((data)=>{
        dispatch(setAllProducts(data));
      });
    }
  },[])



  return (
    <main className=" w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <Hotelhome />
        <HotelSlider/>
        <HotelFilter/>
      </div>
      {isbook && <HotelCart />}
      {isCart && <Cart />}

    </main>
  );
};

export default Main;

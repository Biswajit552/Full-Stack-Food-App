import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import {SliderCard } from "../components";
import { Autoplay } from 'swiper/modules';

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [Fruits, setFruits] = useState(null);
  useEffect(() => {
    setFruits(products?.filter((data) => data.product_category === "fruits"));
    console.log(Fruits);
  }, [products]);
  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        modules={[ Autoplay]}
        autoplay={{
          delay: 2000,
        }}
        className="mySwiper"
      >
        {Fruits && Fruits.map((data,i)=>
        <SwiperSlide key={i}>
            <SliderCard key={i} data={data} index={i} /> 
        </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;

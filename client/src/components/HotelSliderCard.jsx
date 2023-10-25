import React from "react";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick, fadeInOut } from "../animations";
import {
  addNewBookToCart,
  addNewItemToCart,
  getAllBookItems,
  getAllCartItems,
} from "../api";
import { useDispatch, useSelector } from "react-redux";
import { alertNull, alertSuccess } from "../context/actions/alertActions";
import { setBookItems } from "../context/actions/bookActions";

const HotelSliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const sendToCart = () => {
    dispatch(alertSuccess("Added to the cart"));
    addNewBookToCart(user?.user_id, data).then((res) => {
      getAllBookItems(user?.user_id).then((books) => {
        dispatch(setBookItems(books));
        console.log(books);
      });
      setInterval(() => {
        dispatch(alertNull());
      }, 3000);
    });
  };
  return (
    <div
      className="bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex flex-col items-center
     justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3"
    >
      <img
        src={data.imageURL}
        className="w-[25rem] h-40 object-contain"
        alt=""
      />
      <div className="relative pt-12">
        <p className="text-xl text-headingColor font-semibold">
          {data.hotel_name}
        </p>
        <p className="text-lg font-semibold text-red-600 flex items-center justify-center gap-1">
          <HiCurrencyRupee className="text-red-600" />{" "}
          {parseFloat(data.hotel_price).toFixed(2)}
          {/* ₹{data.product_price} */}
        </p>
        <motion.div
          {...buttonClick}
          onClick={sendToCart}
          {...fadeInOut}
          className="w-24 h-8 rounded-full bg-red-500 flex  items-center
                 justify-center absolute  -right-[7rem] top-[4.5rem] cursor-pointer text-primary hover:bg-green-600"
        >
          Book-Now
          {/* <IoBasket className="text-2xl text-primary"/> */}
        </motion.div>
      </div>
    </div>
  );
};

export default HotelSliderCard;

import React from "react";
// import  MaterialTable from "material-table" ;
// import { createTheme, ThemeProvider } from '@mui/material';
import { DataTable } from "../components";
import { HiCurrencyRupee } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {  deleteHotel, getAllHotels } from "../api";
import { setAllhotels } from "../context/actions/hotelActions";
import { alertNull, alertSuccess } from "../context/actions/alertActions";

const DBHotelItem = () => {
  const hotels = useSelector((state) => state.hotels);
  const dispatch = useDispatch();

  return (
    <div className=" flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
      columns={[
        {
          title: "Image",
          field: "imageURL",
          render: (rowData) => (
            <img
              src={rowData.imageURL}
              className="w-32 h-16 object-contain rounded-md"
              alt=""
            />
          ),
        },
        {
          title: "Name",
          field: "hotel_name",
        },
        {
          title: "Category",
          field: "hotel_category",
        },
        {
          title: "Price",
          field: "hotel_price",
          render: (rowData) => (
            <p className="text-2xl font-semibold text-textColor flex items-center justify-center  ">
              <HiCurrencyRupee className="text-red-400" />

              {parseFloat(rowData.hotel_price).toFixed(2)}
            </p>
          ),
        },
      ]}
      data={hotels}
      title="List of hotels"
      // actions={[
      //   {
      //     icon: "edit",
      //     toolbar: "Edit Data",
      //     onclick: (event, rowData) => {
      //       console.log("click edit");
      //       alert("You want to edit" + rowData.productId);
      //     },
      //   },
      //   {
      //     icon: "delete",
      //     toolbar: "Delete Data",
      //     onclick: (event, rowData) => {
      //       console.log("click edit");
      //       alert("You want to delete" + rowData.productId);
      //     },
      //   },
      // ]}
      actions={[
        (rowData) => ({
          icon: "edit",
          tooltip: "Edit Data",
          onClick: (event, rowData) => {
            alert("hii" + rowData.hotelId);
          },
        }),
        (rowData) => ({
          icon: "delete",
          tooltip: "Delete Data",
          onClick: (event, rowData) => {
            if (
              window.confirm("Are  you sure, you want to perform this action")
            ) {
              deleteHotel(rowData.hotelId).then((res) => {
                dispatch(alertSuccess("Hotel Deleted"));
                setInterval(() => {
                  dispatch(alertNull());
                }, 3000);
                getAllHotels().then((data) => {
                  dispatch(setAllhotels(data));
                });
              });
            }
          },
        }),
      ]}
   
      
      />
    </div>
  );
};

export default DBHotelItem;

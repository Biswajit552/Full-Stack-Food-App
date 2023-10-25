export const setBookings = (data) =>{
    return{
        type : "SET_BOOKINGS",
        bookings : data,
    };
};

export const getBookings = (data) =>{
    return{
        type : "GET_BOOKINGS",
    };
};
export const setAllhotels = (hotels) => {
    return{
        type: "SET_ALL_HOTELS",
        hotels: hotels,

    };
};

export const getAllhotels = (hotels) => {
    return{
        type: "GET_ALL_HOTELS",


    };
};
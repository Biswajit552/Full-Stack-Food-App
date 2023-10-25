const bookingsReducer = (state = null, action) =>{
    switch(action.type){
        case "SET_BOOKINGS":
            return action.bookings;

        case "GET_BOOKINGS":
            return state;

        default:
            return state;
    }
};

export default bookingsReducer;
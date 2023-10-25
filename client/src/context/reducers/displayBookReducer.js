const displayBookReducer = (state = false, action)=>{
    switch(action.type){
        case "GET_BOOK_DISPLAY_STATE":
            return state;

        case "SET_BOOK_ON":
            return true;

        case "SET_BOOK_OFF":
            return false;

        default:
            return state;
    }
};


export default displayBookReducer;
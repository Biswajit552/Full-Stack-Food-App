const bookReducer = (state = null, action) =>{
    switch(action.type){
        case "GET_BOOK_ITEMS":
            return state;
        
        case "SET_BOOK_ITEMS":
            return action.books;


         case "CLEAR_BOOK_ITEMS":
            return action.books;

        default:
            return state;
    }
};

export default bookReducer;
export const setBookItems = (books) =>{
    return{
        type:"SET_BOOK_ITEMS",
        books:books,
    }
};

export const getCartItems = (books) =>{
    return{
        type:"GET_BOOK_ITEMS",
    }
};

export const clearCartItems = (books) =>{
    return{
        type:"CLEAR_BOOK_ITEMS",
        books:null,
    }
};
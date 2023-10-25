import axios from "axios";


export  const baseURL =
 "http://127.0.0.1:5001/food-app-4cb65/us-central1/app";


 export const validateUserJWTToken = async (token)=>{
    try{
        const res = await axios.get(`${baseURL}/api/users/jwtVerfication`,{
            headers:{Authorization:"Bearer "+ token}
        });
        return res.data.data;
    }catch(err){
        return null;
    }
 };
 //add new product
 export const addNewProduct = async (data) =>{
    try{
        const res = await axios.post(`${baseURL}/api/products/create`, {...data})
        console.log(data)
        return res.data.data;


    }catch(err){
        return null;
    }
 }
 //hotel
 export const addNewhotel = async (data) =>{
    try{
        const res = await axios.post(`${baseURL}/api/hotels/add`, {...data})
        console.log(data)
        return res.data.data;
    }catch(err){
        return null;
    }
 }

 // get all the products 
 export const getAllProducts = async () =>{
    try{
        const res = await axios.get(`${baseURL}/api/products/all`)
        return res.data.data;
    }catch(err){
        return null;
    }
 };
 //hotels
 export const getAllHotels = async () =>{
    try{
        const res = await axios.get(`${baseURL}/api/hotels/all`)
        return res.data.data;
    }catch(err){
        return null;
    }
 };

//delete the product
export const deleteAProducts = async (productId) =>{
    try{
        const res = await axios.delete(`${baseURL}/api/products/delete/${productId}`);
        return res.data.data;
    }catch(err){
        return null;
    }
 };


 // delete hotel
 export const deleteHotel = async (hotelId) =>{
    try{
        const res = await axios.delete(`${baseURL}/api/hotels/delete/${hotelId}`);
        return res.data.data;
    }catch(err){
        return null;
    }
 };

 //
 export const getAllUsers = async () =>{
    try{
        const res = await axios.get(`${baseURL}/api/users/all`)
        return res.data.data;
    }catch(err){
        return null;
    }
 };

 //add an item to cart
 export const addNewItemToCart = async (user_id, data)=>{
    try {
        const res = await axios.post(`${baseURL}/api/products/addToCart/${user_id}`,
        {...data}
        );
        return res.data.data;
        
    } catch (err) {
        return null;
        
    }
 }

 //add an booking
 export const addNewBookToCart = async (user_id, data)=>{
    try {
        const res = await axios.post(`${baseURL}/api/hotels/addToBook/${user_id}`,
        {...data}
        );
        return res.data.data;
        
    } catch (err) {
        return null;
        
    }
 }
 //
 export const getAllCartItems = async (user_id)=>{
    try {
        const res = await axios.get(`${baseURL}/api/products/getCartItems/${user_id}`
        );

        return res.data.data;
        
    } catch (err) {
        return null;
        
    }
 }

 //book
 export const getAllBookItems = async (user_id)=>{
    try {
        const res = await axios.get(`${baseURL}/api/hotels/getBookItems/${user_id}`
        );

        return res.data.data;
        
    } catch (err) {
        return null;
        
    }
 }

 // cart increment
 export const increaseItemQuantity = async (user_id, productId, type)=>{
    console.log(user_id, productId, type);
    try {
        const res = await axios.post(`${baseURL}/api/products/updateCart/${user_id}`,null,
        {params:{ productId:productId, type:type}}
        );
        
        return res.data.data;
        
    } catch (error) {
        return null;
        
    }
 };

 // book increment
 export const increaseBookQuantity = async (user_id, hotelId, type)=>{
    console.log(user_id, hotelId, type);
    try {
        const res = await axios.post(`${baseURL}/api/hotels/updateBook/${user_id}`,null,
        {params:{ hotelId:hotelId, type:type}}
        );
        
        return res.data.data;
        
    } catch (error) {
        return null;
        
    }
 };

 export const getAllOrder = async ()=>{
    try {
        const res = await axios.get(`${baseURL}/api/products/orders`);
        return res.data.data;
    } catch (err) {
        return null;
        
    }
 }

 //update order

 export const updateOrderSts = async (order_id, sts)=>{
    try {
        const res = await axios.post(`${baseURL}/api/products/updateOrder/${order_id}`,
        null,
        {params: { sts: sts }}
        );
        console.log(sts)
        console.log(order_id)
        return res.data.data;
        
    } catch (error) {
        return null;
        
    }
 } 

 //booking
 export const getAllBooking = async ()=>{
    try {
        const res = await axios.get(`${baseURL}/api/hotels/Bookings`);
        return res.data.data;
    } catch (err) {
        return null;
        
    }
 }

 //update order

 export const updateBookingSts = async (booking_id, sts)=>{
    try {
        const res = await axios.post(`${baseURL}/api/hotels/updateBooking/${booking_id}`,
        null,
        {params: { sts: sts }}
        );
        console.log(sts)
        console.log(booking_id)
        return res.data.data;
        
    } catch (error) {
        return null;
        
    }
 } 
import { combineReducers } from "redux";
import productReducer  from "./productReducer"
import { cartReducer } from "./cartReducer";

 const reducers = combineReducers({
    
    allProducts: productReducer,
    cart: cartReducer,
  

});
export default reducers;


// const Reducer = (cart = [], action) => {
//     if (action.type === "ADD"){
//         let tempcart = cart.filter((item) => item.Slug === action.payload.slug)
//         if (tempcart < 1){
//             return [...cart, action.payload]
//         }
//         else {
//             return cart
//         }
//     }
//     return cart;
// }

// export default Reducer
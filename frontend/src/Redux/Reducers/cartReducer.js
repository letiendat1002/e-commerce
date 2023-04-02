import {
  CART_ADD_ITEM,
  CART_INCREASE_ITEM,
  CART_DESCREASE_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
} from "../Constants/cartConstant";


export const cartReducer = (
  state = { cartItems: [] },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.slug === item.slug);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.slug === existItem.slug ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    
    case CART_INCREASE_ITEM:
      const items = action.payload;
      const existItems = state.cartItems.find((x) => x.slug === items.slug); 
      if (existItems) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.slug === existItems.slug ? items : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, items],
        };
      }
    case CART_DESCREASE_ITEM:
      const iTem = action.payload;
      const existItemS = state.cartItems.find((x) => x.slug === iTem.slug); 
      if (existItemS) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.slug === existItemS.slug ? iTem : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, iTem],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
  
    
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    
    default:
      return state;
  }
};

import {
    CART_ADD_ITEM,
    CART_DESCREASE_ITEM,
    CART_INCREASE_ITEM,
    CART_REMOVE_ITEM,
    CART_CLEAR_ITEMS,
} from "../Constants/cartConstant";

export const addToCart = (item, qty) => (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: item.ProductID,
            slug: item.Slug,
            name: item.Name,
            image: item.Image,
            price: item.UnitPrice,
            qty ,
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const increaseToCart = (item, qty) => (dispatch, getState) => {
    dispatch({
        type: CART_INCREASE_ITEM,
        payload: {
            ...item,
            qty: item.qty + 1 ,
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const descreaseToCart = (item, qty) => (dispatch, getState) => {
    dispatch({
        type: CART_DESCREASE_ITEM,
        payload: {
            ...item,
            qty: item.qty - 1 ,
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
    dispatch({
        type: CART_CLEAR_ITEMS,
    });
    localStorage.removeItem("cartItems");
}


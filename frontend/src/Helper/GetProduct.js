import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../Redux/slice/productSlice";

const Products = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    const products = useSelector(state => state.product.data || []);

    return products;
}


const GetRandomProducts = (count) => {
    const products = useSelector(state => state.product.data || []);
    const max = products.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return products.slice(start, start + count)
}

function GetProductsForRecommendation(count, productsOfCategory){
    // const products = useSelector(state => state.product.data || []);
    const max = productsOfCategory.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return productsOfCategory.slice(start, start + count)
}


const GetProductsOfCategory = (CategoryID) => Products.find(e => e.CategoryID === CategoryID)
// const getProductForCategory = (count) => {
//     const max = product.length - count
//     const min = 0
//     const start = Math.floor(Math.random() * (max - min) + min)
//     return product.slice(start, start + count)
// }



const productData = {
    GetRandomProducts,
    GetProductsOfCategory, 
    GetProductsForRecommendation
}

export default productData
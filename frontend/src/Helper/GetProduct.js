import Products from "../assets/data/product";

const getAllProducts = () => Products

const getProducts = (count) => {
    const max = Products.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return Products.slice(start, start + count)
}

const getProduct = (count, product) => {
    const max = product.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return product.slice(start, start + count)
}


const getProductForCategory = (CategoryID) => Products.find(e => e.CategoryID === CategoryID)
// const getProductForCategory = (count) => {
//     const max = product.length - count
//     const min = 0
//     const start = Math.floor(Math.random() * (max - min) + min)
//     return product.slice(start, start + count)
// }



const productData = {
    getAllProducts,
    getProducts,
    getProductForCategory, 
    getProduct
}

export default productData
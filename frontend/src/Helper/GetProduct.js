import Products from "../assets/data/product";

const getAllProducts = () => Products

const getRandomProducts = (count) => {
    const max = Products.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return Products.slice(start, start + count)
}

const getProductsForRecommendation = (count, productsOfCategory) => {
    const max = productsOfCategory.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return productsOfCategory.slice(start, start + count)
}


const getProductsOfCategory = (CategoryID) => Products.find(e => e.CategoryID === CategoryID)
// const getProductForCategory = (count) => {
//     const max = product.length - count
//     const min = 0
//     const start = Math.floor(Math.random() * (max - min) + min)
//     return product.slice(start, start + count)
// }



const productData = {
    getAllProducts,
    getRandomProducts,
    getProductsOfCategory, 
    getProductsForRecommendation
}

export default productData
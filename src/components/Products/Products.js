import React from 'react'
import ProductCard from '../Card/ProductCard'
import './Products.css'

const Products = ({products, addToCart}) => {
    // console.log(addToCart);
    return products.map(item => (
        <ProductCard key={item.ID} item={item} addToCart={addToCart}/>
    ))
}

export default Products

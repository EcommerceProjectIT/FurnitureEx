import React from 'react'
import './ProductCard.css'

const ProductCard = ({item, addToCart}) => {

    const handleAddtoCart = () => {
        addToCart(item)
    }

    return (
        <div className="productCard">
        <h3>{item.title}</h3>
            <img src={item.url} alt="" className="ProductImage"/>
            <hr style={{marginTop: 15}}/>
            <div className="productDetail">
            <p style={{fontSize: 14, fontWeight:500}}>Details</p>
            <h5 style={{fontSize: 18, fontWeight:500}}>₹ {item.price}</h5>
            <p className="desc_card">{item.description}</p>
            <div className="buttons" onClick={handleAddtoCart}>
                <p className="cartButton button">Add to Cart</p>
            </div>
            </div>
        </div>
    )
}

export default ProductCard

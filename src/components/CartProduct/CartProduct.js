import React from 'react'
import IndividualCartProduct from '../IndividualCartProduct/IndividualCartProduct'
import StripeCheckout from 'react-stripe-checkout'
import './CartProduct.css'

const CartProduct = ({cartProducts,cartProductIncrease,cartProductDecrease,totalQty,totalPrice,handleToken,setShowModal,showModal}) => {

    return (
        <div className="cart_container">
            <div className="cart_left">
                {cartProducts.map((product) => (
                    <IndividualCartProduct key={product.ID} product={product} cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease}/>
                ))}
            </div>
            <div className="cart_right">
                <div className="cart_summary">
                    <h3 style={{marginBottom: 10}}>Cart Summary</h3>
                    <hr />
                    <br /><br />
                    <div className="cart_summary_items">
                        <div className="cart_summary_section">
                            <h3>Total No. of Products:</h3>
                            <h4>{totalQty}</h4>
                        </div>
                        <div className="cart_summary_section">
                            <h3>Total Amount to Pay:</h3>
                            <h4>₹ {totalPrice}</h4>
                        </div>
                    </div>
                    <StripeCheckout 
                    style={{marginTop: 20}}
                    stripeKey='pk_test_51Jdg2JSFP1EbIRNuRDyhNgTdRh6mIWxR5ZbzzmeByZtSUqegfq2fzBS5CrJODCoPJdlgXNcbMwAESwbodYkGAH3j00CvvMvZRV'
                    token={handleToken}
                    billingAddress
                    shippingAddress
                    name="All Products"
                    amount={totalPrice * 100}
                    />
                    <div className="contain" style={{textAlign: 'center', marginTop: 10, marginBottom:10}}>
                        <h4>OR</h4>
                    </div>
                    <button className="bttn" onClick={() => setShowModal(!showModal)}>Cash on Delivery</button>

                </div>
            </div>
        </div>
    )
}

export default CartProduct

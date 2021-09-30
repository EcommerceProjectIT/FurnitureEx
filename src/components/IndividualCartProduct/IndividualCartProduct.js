import React from 'react'
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { db,auth } from '../../utils/firebase';
import './IndividualCartProduct.css'

const IndividualCartProduct = ({product,cartProductIncrease,cartProductDecrease}) => {

    const handleCartProductIncrease = () => {
        cartProductIncrease(product);
    }

    const handleCartProductDecrease = () => {
        cartProductDecrease(product);
    }
    const handleProductDelete = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('Cart' + user.uid).doc(product.ID).delete().then(() => 
                console.log('item deleted')
                )
            }
        })
    }

    return (
        <div className="individualProduct">
            <img src={product.url} alt="" />
            <div className="cart_details">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <h3 style={{fontWeight:500, fontSize:18,marginTop:10}}>₹ {product.totalProductPrice}</h3>
            </div>
            <div className="cart_quantity_btn">
                <div className="add" onClick={handleCartProductIncrease}>
                    <AddRoundedIcon />
                </div>
                <h3>{product.qty}</h3>
                <div className="minus" onClick={handleCartProductDecrease}>
                    <RemoveRoundedIcon/>
                </div>
            </div>
            <div className="delete" >   
                <div className="delete_btn" onClick={handleProductDelete}>
                <DeleteRoundedIcon fontSize='large' style={{color: 'red'}}/>
                </div>
            </div>
        </div>
    )
}

export default IndividualCartProduct

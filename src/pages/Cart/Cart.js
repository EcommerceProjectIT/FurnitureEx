import axios from 'axios';
import React,{useEffect,useState} from 'react';
import CartProduct from '../../components/CartProduct/CartProduct';
import Navbar from '../../components/Navbar/Navbar';
import {Modal} from '../../components/Modal/Modal';
import { auth,db } from '../../utils/firebase';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';

toast.configure();

const Cart = () => {
    const GetCurrentUser = () => {
        const [user,setUser] = useState(null);
        useEffect(() =>{
            auth.onAuthStateChanged(user => {
                if (user) {
                    db.collection('users').doc(user.uid).get()
                    .then((snapshot) => {
                        setUser(snapshot.data())
                    })
                }else {
                    setUser(null)
                }
            })
        },[])
        return user
    }
    const user = GetCurrentUser();


    // cart State
    const [cartProducts,setCartProducts] = useState([]);

    // get cart items
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('Cart' + user.uid).onSnapshot(snapshot => {
                    const newCartProduct = snapshot.docs.map((doc) => ({
                        Id : doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);
                });
            } else {
                console.log('no user to get cart');
            }
        })
    },[])

    // Global
    let Product;

    // getting qty
    const qty = cartProducts.map(item => {
        return item.qty
    })
    const reducerQty = (accumulator,currentValue) => accumulator+currentValue;

    const totalQty = qty.reduce(reducerQty,0)

    const price = cartProducts.map(item => {
        return item.totalProductPrice
    })
    const reducerPrice = (accumulator,currentValue) => accumulator+currentValue;

    const totalPrice= price.reduce(reducerPrice,0)

    // increase cart item
    const cartProductIncrease = (product) => {
        Product = product;
        Product.qty = product.qty+1;
        Product.totalProductPrice = Product.qty*Product.price;
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('Cart' + user.uid).doc(product.ID).update(Product).then(() => {

                })
            }
        })
    }
    const cartProductDecrease = (product) => {
        Product = product;
        if (Product.qty > 1) {
            Product.qty = product.qty-1;
            Product.totalProductPrice = Product.qty*Product.price;
            auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('Cart' + user.uid).doc(product.ID).update(Product).then(() => {
                    
                })
            }
        })}
        
    }

    const history = useHistory();
    const handleToken = async (token) => {
        // console.log(token);
        const cart = { name: 'All Products', totalPrice };
        const response = await axios.post('https://furnitureex.herokuapp.com/checkout',{
            token,
            cart
        });
        console.log(response);
        let {status} = response.data;
        console.log(status);
        if (status === 'success') {
            history.push('/');
            toast.success('Your Order has been placed Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            const uid = auth.currentUser.uid;
            const carts = await db.collection('Cart'+ uid).get();
            for (let snap of carts.docs) {
                db.collection('Cart'+uid).doc(snap.id).delete();
            }

        } else {
            alert('Something went wrong in checkout')
        }
        
    }
    const [showModal,setShowModal] = useState(false);
    const hideModal=()=>{
        setShowModal(false);
      }
    return (
        <>
        <Navbar user={user}/>
            <br />
            <h2 style={{fontWeight: 600,marginLeft: 30}}>Cart Items :</h2>
            {cartProducts.length > 0 && (
                <div >
                    <div className="products-box">
                        <CartProduct
                        showModal={showModal}
                        setShowModal={setShowModal}
                        handleToken={handleToken}
                        totalQty={totalQty}
                        totalPrice={totalPrice}
                        cartProducts={cartProducts} 
                        cartProductIncrease={cartProductIncrease} 
                        cartProductDecrease={cartProductDecrease}/>
                    </div>
                </div>
            )}

            {cartProducts.length < 1 && (
                <div className="container-fluid">
                    <div className="prodddd">
                    <img src="sad.png" alt="" />
                    <h2>No Products to Show</h2>
                    </div>
                </div>
            )}
            {showModal===true &&(
                <Modal
                totalQty={totalQty}
                totalPrice={totalPrice}
                hideModal={hideModal}/>
            )}
        </>
    )
}

export default Cart

import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Products from '../../components/Products/Products'
import { auth,db } from '../../utils/firebase'
import './Home.css'

const Home = (props) => {

    //get current user uid
    function GetUserUid() {
        const [uid,setUid] = useState(null);

        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                }
            })
        },[]);

        return uid;
    }
    const uid = GetUserUid();

    // get current user
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

    const[allProducts,setAllProducts] = useState([])

    // get All Products
    const getAllProducts = async () => {
        const products = await db.collection('products').get();
        const productsArray = [];

        for (let item of products.docs) {
            let data = item.data();
            data.ID = item.id;
            productsArray.push({...data})
        }
        if (productsArray.length === products.docs.length) {
            setAllProducts(productsArray);
        }
    }

    useEffect(() => {
        getAllProducts();
    },[])

    let Product;
    const addToCart = (product) => {
        if (uid !== null) {
            Product = product;
            Product['qty'] = 1;
            Product['totalProductPrice'] = Product.qty*Product.price;
            db.collection('Cart' + uid).doc(product.ID).set(Product).then(() => {
                console.log('item Added to cart');
            })
        } else {
            props.history.push('/login');
        }
    };

    return (
        <div>
            <Navbar user={user}/>
            {
                allProducts.length > 0 &&(
                    <div className="container">
                        <h1>All Products</h1>
                        <div className="hero">

                        <Products products={allProducts} addToCart={addToCart}/>
                        </div>
                    </div>
                )
            }
            {
                allProducts.length < 1 &&(
                    <div className="container">
                        <h1>All Products</h1>
                        <h3>Please Wait...</h3>
                    </div>
                )
            }
        </div>
    )
}

export default Home

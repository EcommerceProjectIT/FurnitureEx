import React,{useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined'
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded'
import Badge from '@material-ui/core/Badge'
import { auth,db } from '../../utils/firebase'
import './Navbar.css'

const Navbar = ({user}) => {

    const history = useHistory();

    const handleLogout = () => {
        auth.signOut()
        .then(() => {
            history.push('/login')
        }).catch(error => {
            console.log(error.message);
        })
    }
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
    const qty = cartProducts.map(item => {
        return item.qty
    })
    const reducerQty = (accumulator,currentValue) => accumulator+currentValue;

    const totalQty = qty.reduce(reducerQty,0)

    return (
        <nav className="header">
            <div className="logo">
                <img src="icon.png" className="icon" alt="icon"/>
                <h2><a href="/" style={{textDecoration: 'none', color: 'white'}}>FurnitureEx</a></h2>
            </div>
            {
                user&& <>
                <div className="nav_actions link">
                <AccountCircleRounded />
                <h2 style={{marginLeft:5}}>{user.Fullmame}</h2>
                <Link to="/cart" className="link basket">
                    <Badge badgeContent={totalQty} color="secondary">
                        <ShoppingCartOutlined/>
                    </Badge>
                </Link>
                <h3 onClick={handleLogout}>Logout</h3>
                </div>
                </>
            }
            {
                !user&& <>
                <div className="nav_actions">
                    <Link to="signup" className="link">SignUp</Link>
                    <Link to="login" className="link">Login</Link>
                    <Link to="/cart" className="link basket">
                        <Badge badgeContent={0} color="secondary">
                            <ShoppingCartOutlined/>
                        </Badge>
                    </Link>
                </div>
                </>
            }
        </nav>
    )
}

export default Navbar

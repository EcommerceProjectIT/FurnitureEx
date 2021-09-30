import React,{useState} from 'react'
import {auth,db} from '../../utils/firebase'
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const Modal = ({totalPrice,totalQty,hideModal}) => {

    const history = useHistory();

    // console.log(TotalPrice, totalQty);

    // form states
    const [cell, setCell]=useState(null);
    const [residentialAddress, setResidentialAddress]=useState('');
    const [cartPrice]=useState(totalPrice);
    const [cartQty]=useState(totalQty);

    // close modal
    const handleCloseModal=()=>{
        hideModal();
    }

    // cash on delivery function
    const handleCashOnDelivery = async (e) =>{
        e.preventDefault();
        
        // console.log(cell,residentialAddress,cartPrice,cartQty);

        const uid = auth.currentUser.uid;
        const userData = await db.collection('users').doc(uid).get();
        await db.collection('Buyer-Personal-Info').add({
            Name:userData.data().Fullmame,
            Email: userData.data().Email,
            CellNo: cell,
            ResidentialAddress: residentialAddress,
            CartPrice: cartPrice,
            CartQty: cartQty
        })      
        const cartData = await db.collection('Cart' + uid).get();
        for(var snap of cartData.docs){           
            var data = snap.data();           
            data.ID = snap.id;           
            await db.collection('Buyer-Cart' + uid).add(
                data
            );
            await db.collection('Cart' + uid).doc(snap.id).delete();                              
        }
        hideModal(); 
        history.push('/');     
        toast.success('Your order has been placed successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });       
    }

    return (
        <div className='shade-area'>
            <div className='modal-container'>
                <form className='form-group' onSubmit={handleCashOnDelivery}>                   
                    <input type="phone" className='form-control' placeholder='Phone Number'
                        required onChange={(e)=>setCell(e.target.value)} value={cell}                        
                    />
                    <br></br>
                    <input type="text" className='form-control' placeholder='Residential Address'
                        required onChange={(e)=>setResidentialAddress(e.target.value)}
                        value={residentialAddress}
                    />
                    <br></br>
                    <label>Total Quantity</label>
                    <input type="text" className='form-control' readOnly
                        required value={cartQty}
                    />
                    <br></br>
                    <label>Total Price</label>
                    <input type="text" className='form-control' readOnly
                        required value={cartPrice}
                    />
                    <br></br>
                    <button type='submit' className='btnn'>Submit</button>
                </form>
                <div className='delete-icon' onClick={handleCloseModal}>X</div>
            </div>
        </div>
    )
}
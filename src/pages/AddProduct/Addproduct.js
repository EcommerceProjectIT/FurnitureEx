import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { db, storage } from '../../utils/firebase'

const Addproduct = () => {

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [image,setImage] = useState(null);
    const [imageError,setImageError] = useState('');

    const [errorMsg,setErrorMsg] = useState('');
    const [successMsg,setSuccessMsg] = useState('');

    const type = ['image/jpg','image/jpeg','image/png','image/PNG']

    // add product
    const handleAddproduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on('state_changed',snapshot => {
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error =>setErrorMsg(error.message)
        ,() =>{
            storage.ref('product-images').child(image.name).getDownloadURL()
            .then(url => {
                db.collection('products').add({
                    title,
                    description,
                    price: Number(price),
                    url
                }).then(() => {
                    setSuccessMsg('Product Added Successfully.')
                    setTitle('');
                    setDescription('');
                    setPrice('');
                    document.getElementById('file').value='';
                    setImageError('');
                    setErrorMsg('');
                    setTimeout(() => {
                        setSuccessMsg('')
                    }, 2000);
                }).catch(error => {
                    setErrorMsg(error.message)
                })
            })
        })
    }


    // check image
    const handleProductImg = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile&&type.includes(selectedFile.type)) {
                setImage(selectedFile);
                setImageError('');
            }else{
                setImage(null);
                setImageError('Please select a valid file type (png or jpg)')
            } 
        }else {
            alert('Please select an image')
        }
    }

    return (
        <div className="main">
            <div className="card">

                <h1>Login</h1>
                {
                    successMsg&& <div className="success msg">{successMsg}
                    <br /></div> 
                }
                <form onSubmit={handleAddproduct}>
                    <div className="form_field">
                        <h3>Product Title: </h3>
                        <input type="text" required onChange={(e) =>setTitle(e.target.value)}/>
                    </div>

                    <div className="form_field">
                        <h3>Product Description: </h3>
                        <input type="text" required onChange={(e) =>setDescription(e.target.value)}/>
                    </div>
                    <div className="form_field">
                        <h3>Product Price: </h3>
                        <input type="number" required onChange={(e) =>setPrice(e.target.value)}/>
                    </div>
                    <div className="form_field">
                        <h3>Upload Product Image: </h3>
                        <input type="file" id="file" required onChange={handleProductImg}/>
                    </div>
                    {
                    imageError&& <div className="error msg">{imageError}
                    <br /></div> 
                    }
                    <button type="submit">Add Product</button>
                </form>
                {
                    errorMsg&& <div className="error msg">{errorMsg}
                    <br /></div> 
                }
                
            </div>
        </div>
    )
}

export default Addproduct

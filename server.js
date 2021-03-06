const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Jdg2JSFP1EbIRNuDqgmAYEePqqp0Ong4AgXGzSWoRxtHtpTwQNEgyNfyZMk0Ts807QyncQxP9wrXFcAtuuukyUY00BlmNJEqd')
const {v4: uuidv4} = require('uuid');
const path = require('path');

const app = express();


const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'build','index.html'))
    })
}

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('Welcome to Furnitureex')
});

app.post('/checkout', async (req,res) => {
    let status;

    try {

        const {cart,token} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const key = uuidv4();
        const charge = await stripe.charges.create({
            amount: cart.totalPrice * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            description: 'products',
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        },{idempotencyKey: key})
        status = "success";
    } catch (error) {
        console.log(error);
        status="error";
    }
    res.json({status});
})

app.listen(PORT, () => console.log(`Backend Running on Port ${PORT}`));
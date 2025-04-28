const express = require('express')
const cors = require('cors')
const {connectDB} =require ('./db.js');
const env=require ('dotenv/config');
const userRouter = require('./Routes/UserRoutes.js');
const foodRoutes = require('./Routes/FoodRoute.js');
const TableRoutes = require('./Routes/TableRoute.js');
//app config
const stripe = require('stripe')(process.env.STRIPE_API_KEY);  // Remplace par ta clé secrète Stripe

const ReserveRoutes=require('./Routes/ReservationRoutes.js')
const app=express();
const {stripeWebhook}=require('./Controllers/Payment.js')
const port=4000


//middleware
// Webhook route d'abord en RAW
app.post('/webhook', 
    express.raw({ type: 'application/json' }), stripeWebhook);
app.use('/uploads', express.static('uploads'));
// Puis seulement après, tu mets express.json() pour tout le reste
app.use(express.json())
app.use(cors())

connectDB();

app.use('/api/reserve',ReserveRoutes)
app.use('/api/tables', TableRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/user',userRouter)

app.get("/",(req,res)=>{
res.send("API Working")
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}` )
})
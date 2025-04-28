const express= require ('express');
const {getAll, makereserve,createCheckoutSession,GetUsersReservations,endReservation,cancelReservation,deleteReservation}= require ('../Controllers/ReserveController')


const reserveRouter=express.Router();
reserveRouter.get('/cancel/:id',cancelReservation)
reserveRouter.get('/end/:id',endReservation)
reserveRouter.delete('/:id', deleteReservation)
reserveRouter.get('/get/:id', GetUsersReservations)

reserveRouter.post('/reserve/:id', createCheckoutSession)
reserveRouter.get('/',getAll)



module.exports=reserveRouter
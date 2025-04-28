const express= require ('express');
const {loginUser, registerUser,getUser, updateUser, deleteUser, getAllUsers}= require ('../Controllers/UserController')


const userRouter=express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getuser/:id', getUser)
userRouter.put('/updateuser/:id', updateUser)
userRouter.delete('/deleteuser', deleteUser)
userRouter.get('/getallusers', getAllUsers)


module.exports=userRouter
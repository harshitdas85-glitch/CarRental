import express from "express"
import { getcars, getuserdata, registerUser } from "../Controllers/UserController.js"
import { loginUser } from "../Controllers/UserController.js"
import authuser from "../Middlewares/Auth.js"
const UserRouter = express.Router()
UserRouter.post('/register',registerUser)
UserRouter.post('/login',loginUser)
UserRouter.get('/data',authuser,getuserdata)
UserRouter.get('/cars',getcars)
export default UserRouter
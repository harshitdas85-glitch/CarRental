import express, { Router } from "express"
import { addcar, changeRoleToOwner, getOwnerCar, togglecar,deletecar, getdashboarddata } from "../Controllers/OwnerController.js"
import authuser from "../Middlewares/Auth.js"
import upload from "../Middlewares/multer.js"
import { ownerbookings } from "../Controllers/BookingController.js"
const OwnerRouter = express.Router()
OwnerRouter.post("/change-role",authuser,changeRoleToOwner)
OwnerRouter.post("/add-car",authuser,upload.single("image"),addcar)
OwnerRouter.post("/cars",authuser,getOwnerCar)
OwnerRouter.post("/toggle-car",authuser,togglecar)
OwnerRouter.post("/delete-car",authuser,deletecar)
OwnerRouter.get("/dashboard",authuser,getdashboarddata)

export default OwnerRouter

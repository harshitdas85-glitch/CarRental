import express from "express"
import { checkAvailabilityofCar, createBooking, ownerbookings, statuschangebooking, userbooking } from "../Controllers/BookingController.js"
import authuser from "../Middlewares/Auth.js"
import { getuserdata } from "../Controllers/UserController.js"
import { getOwnerCar } from "../Controllers/OwnerController.js"
const bookingRouter = express.Router()

bookingRouter.post("/check-availability",checkAvailabilityofCar)
bookingRouter.post("/create",authuser,createBooking)
bookingRouter.get("/user",authuser,userbooking)
bookingRouter.get("/owner",authuser,ownerbookings)
bookingRouter.post("/change-status",authuser,statuschangebooking)
export default bookingRouter
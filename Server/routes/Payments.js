// Import the required modules
const express = require("express")
const router = express.Router()

const { 
    capturePayment, 
    verifyPayment, 
    sendPaymentSuccessEmail,
    getPaymentHistory
} = require("../controllers/Payments")

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// Payment processing routes
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail)

// Payment history route
router.get("/paymentHistory", auth, isStudent, getPaymentHistory)

module.exports = router
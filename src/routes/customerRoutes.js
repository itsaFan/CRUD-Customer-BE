const express = require("express");
const { createCustomer, getAllCustomers, updateCustomerById, deleteCustomerById } = require("../controllers/customerController");

const router = express.Router();

router.get("/customers", getAllCustomers);
router.post("/register", createCustomer);
router.patch("/customer/:customerId", updateCustomerById);
router.delete('/customer/:customerId', deleteCustomerById)

module.exports = router;

const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// Route to add a customer
router.post("/customers", async (req, res) => {
  try {
    // Retrieve customer data from the request body
    const { name, email, balance } = req.body;

    // Create a new customer document
    const customer = new Customer({
      name,
      email,
      balance,
    });

    // Save the customer document to the database
    await customer.save();

    res.status(201).json(customer); // Respond with the added customer data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get a list of all customers
router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get details of a specific customer by ID
router.get("/customers/:customerId", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

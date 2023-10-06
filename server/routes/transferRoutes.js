const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const Transfer = require("../models/Transfer");

//Route to transfer money between customer
router.post("/transfer", async (req, res) => {
  const { senderId, receiverId, amount } = req.body;
  try {
    const sender = await Customer.findById(senderId);
    const receiver = await Customer.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Customer not found" });
    }
    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient Balance" });
    }

    //perform the money transfer
    sender.balance = sender.balance - amount;
    receiver.balance = receiver.balance + amount;

    //save the updated balance
    await sender.save();
    await receiver.save();

    const transfer = new Transfer({
      sender: sender.name,
      receiver: receiver.name,
      amount,
    });
    await transfer.save();

    return res.json({ message: "Transfer successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/transfers", async (req, res) => {
  try {
    const transfers = await Transfer.find().sort({ timestamp: -1 });
    res.json(transfers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

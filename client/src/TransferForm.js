import React, { useEffect, useState } from "react";
import axios from "axios";

function TransferForm() {
  const [senderId, setSenderId] = useState();
  const [receiverId, setReceiverId] = useState();
  const [amount, setAmount] = useState();

  const [customerList, setCustomerList] = useState([]);

  const [transactionStatus, setTransactionStatus] = useState(null);

  useEffect(() => {
    //Make a get request
    axios
      .get("http://localhost:5000/api/customers")
      .then((response) => {
        setCustomerList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transferData = {
      senderId,
      receiverId,
      amount: parseFloat(amount),
    };

    // Reset the transaction status after 3 seconds (for example)
    setTimeout(() => {
      setTransactionStatus(null);
    }, 5000); // Reset after 3 seconds

    //Make a Post request

    axios
      .post("http://localhost:5000/api/transfer", transferData)
      .then((response) => {
        console.log("Transfer Successful: ");
        setTransactionStatus(response.data.message);
      })
      .catch((error) => {
        console.log("Transfer failed:");
        setTransactionStatus(error.response.data.message);
      });
  };

  return (
    <div className="transfer-form">
      <h1>Transfer Money</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Sender:</label>
          <select
            value={senderId}
            onChange={(e) => {
              setSenderId(e.target.value);
            }}
            className="form-select"
          >
            <option selected>Select a Sender</option>
            {customerList.map((customer) => (
              <option
                key={customer._id}
                value={customer._id}
                className="list-group"
              >
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Receiver:</label>
          <select
            value={receiverId}
            onChange={(e) => {
              setReceiverId(e.target.value);
            }}
            className="form-select"
          >
            <option selected>Select a Receiver</option>
            {customerList.map((customer) => (
              <option
                key={customer._id}
                value={customer._id}
                className="list-group"
              >
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        {transactionStatus !== null && (
          <div
            className={`transaction-status ${
              transactionStatus.includes("successful") ? "" : "error-message"
            }`}
          >
            {transactionStatus}
          </div>
        )}
        <div>
          <button type="submit" className="btn btn-primary">
            Transfer
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransferForm;

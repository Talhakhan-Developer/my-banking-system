import React, { useEffect, useState } from "react";
import axios from "axios";
import TransferForm from "./TransferForm";
import Navbar from "./Navbar";
// import CustomerDetail from "./CustomerDetail";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);

  const handleClick = () => {
    setShowCustomerDetail(!showCustomerDetail);
  };
  useEffect(() => {
    // Make a GET request to fetch the list of customers from your backend
    axios
      .get("http://localhost:5000/api/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {showCustomerDetail && (
        <div className="overlay">
          <TransferForm />
          <button
            type="button"
            class="btn-close btn-close-white close-btn"
            aria-label="Close"
            onClick={handleClick}
          ></button>
        </div>
      )}
      <div className="d-flex p-5 justify-content-between">
        <h2 className="text-center">Customer Details</h2>
        <button className="btn btn-primary" onClick={handleClick}>
          Send Money
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr>
              <th scope="row" key={customer._id}>
                {}
              </th>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;

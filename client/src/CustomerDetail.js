import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerDetail(props) {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetchCustomerDetail(props.match.params.customerId);
  }, [props.match.params.customerId]);

  const fetchCustomerDetail = (customerId) => {
    axios
      .get(`http://localhost:5000/api/customers/${customerId}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <h2>CustomerDetail</h2>
      {customer ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.balance}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading customer details...</p>
      )}
    </div>
  );
}

export default CustomerDetail;

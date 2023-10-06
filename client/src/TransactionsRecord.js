import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function TransactionsRecord() {
  const [transactionsRecord, setTransactionsRecord] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transfers")
      .then((response) => {
        setTransactionsRecord(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <h1 className="p-4">Tanscations Record</h1>
      <table className="table p-4">
        <thead>
          <tr>
            <th scope="col">Transaction Id</th>
            <th scope="col">Sender</th>
            <th scope="col">Receiver</th>
            <th scope="col">Amount</th>
            <th scope="col">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactionsRecord.map((record) => (
            <tr>
              <th scope="row" key={record._id}>
                {record._id}
              </th>
              <td>{record.sender}</td>
              <td>{record.receiver}</td>
              <td>{record.amount}</td>
              <td>{record.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsRecord;

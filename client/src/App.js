import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CustomerList from "./CustomerList";
import TransactionsRecord from "./TransactionsRecord";

function App() {
  return (
    <div>
      {/* <Navbar /> */}

      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/CustomerList" element={<CustomerList />}></Route>
          <Route
            path="/transactionsRecord"
            element={<TransactionsRecord />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

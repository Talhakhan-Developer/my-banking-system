import React from "react";
import Navbar from "./Navbar";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <h1>My banking System</h1>
        <p>
          Thank you for choosing MY Banking System for all your banking needs.
          We are committed to providing you with the best banking services and
          financial solutions.
        </p>
      </div>
    </div>
  );
}

export default Home;

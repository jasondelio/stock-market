import NavBar from "../components/NavBar";
import "./HomePage.css";
import React, { useState, useEffect } from "react";
import stockMarket from "../assets/stockmarket.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [index, setIndex] = useState(0);
  const functions = [
    "the list of Nasdaq companies",
    "the general overview of the stocks",
    "the last 100 days chart of the stocks",
    "the last 100 days price history of the stocks",
  ];
  const navigate = useNavigate();

  //For handling the animation, the text will be changed every 2500 ms
  useEffect(() => {
    setTimeout(() => {
      if (index + 1 > 3) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 2500);
  }, [index]);

  //On click handler for browse stocks button
  function buttonHandler() {
    navigate("/stocks");
  }

  return (
    <div className="home-container">
      <NavBar page="Home" />
      <div className="info-container">
        <p className="title">Welcome to the Stock Market Portal !</p>
        <br />
        <p className="info">
          You may navigate to Stocks page
          <br />
          to get <b className="highlight">{functions[index]}</b>
        </p>
        <br />
        <button className="browse-button" onClick={buttonHandler}>
          Browse stocks
        </button>
      </div>
      <img className="image" src={stockMarket} alt=""></img>
    </div>
  );
}

export default HomePage;

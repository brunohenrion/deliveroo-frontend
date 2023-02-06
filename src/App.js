import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/images/logo-teal.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--deliveroo-backend--rjk8ksgk7kql.code.run/"
    );
    //console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div className="App">
      <header>
        <img src={logo} alt="" />
      </header>
      <section>
        <div>
          <div className="description">
            <h2>{data.restaurant.name}</h2>
            <p>{data.restaurant.description}</p>
          </div>
          <div>
            <img src={data.restaurant.picture} alt="" />
          </div>
        </div>
      </section>

      <section className="menu"></section>
    </div>
  );
}

export default App;

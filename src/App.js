import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/images/logo-teal.svg";
import popu from "./assets/images/popu.png";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const [isImg, setIsImg] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--deliveroo-backend--rjk8ksgk7kql.code.run/"
    );
    //console.log(response.data);
    console.log(response.data.categories[0].name);
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
      <section className="descrip">
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

      <section className="menu">
        {data.categories
          .filter(
            (elem) =>
              elem.name !== "Sandwichs baguette" &&
              elem.name !== "Desserts" &&
              elem.name !== "Boissons fraîches" &&
              elem.name !== "Epicerie bio" &&
              elem.name !== "Repas corporate" &&
              elem.name !== "Couverts"
          )
          .map((elem, index) => {
            return (
              <section key={index}>
                <div className="category">{elem.name}</div>

                <div className="imagesgroup">
                  {elem.meals.map((elem, index) => {
                    return (
                      <div key={index} className="images">
                        <div className="desc">
                          <h3 className={elem.picture ? "title3" : "title3bis"}>
                            {elem.title}
                          </h3>

                          <span
                            className={elem.picture ? "spanou" : "spanoubis"}
                          >
                            {elem.description.slice(0, 60)}
                          </span>

                          <div className={elem.picture ? "prix" : "prixbis"}>
                            <h4>{elem.price} €</h4>

                            <div className={elem.popular ? "" : "hidden"}>
                              <img className="popu" src={popu} alt="" />
                            </div>
                          </div>
                        </div>

                        <div className={elem.picture ? "" : "hidden"}>
                          <img className="pic" src={elem.picture} alt="" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
      </section>
    </div>
  );
}

export default App;

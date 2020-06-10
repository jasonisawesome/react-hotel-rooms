import React, { Component } from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "Free Cocktails",
        info:
          "A cocktail is an alcoholic mixed drink, which is either a combination of spirits, or one or more spirits mixed with other ingredients such as fruit juice, flavored syrup, or cream.",
      },
      {
        icon: <FaHiking />,
        title: "Endless Hiking",
        info:
          "A cocktail is an alcoholic mixed drink, which is either a combination of spirits, or one or more spirits mixed with other ingredients such as fruit juice, flavored syrup, or cream.",
      },
      {
        icon: <FaShuttleVan />,
        title: "Free Shuttle",
        info:
          "A cocktail is an alcoholic mixed drink, which is either a combination of spirits, or one or more spirits mixed with other ingredients such as fruit juice, flavored syrup, or cream.",
      },
      {
        icon: <FaBeer />,
        title: "Strongest Beer",
        info:
          "A cocktail is an alcoholic mixed drink, which is either a combination of spirits, or one or more spirits mixed with other ingredients such as fruit juice, flavored syrup, or cream.",
      },
    ],
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item, index) => (
            <article key={index} className="service">
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.info}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }
}

export default Services;

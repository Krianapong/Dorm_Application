import React from "react";
import { list } from "../../data/Data";

const NewsCard = () => {
  return (
    <>
      <div className="content grid3 mtop">
        {list.map((val, index) => {
          const { cover, category, location, name, price, type } = val;
          return (
            <div className="box shadow" key={index}>
              <div className="img">
                <img src={cover} alt="" />
              </div>
              <div className="text">
                <div className="category flex"></div>
                <h4>{name}</h4>
                <p>
                  <i className="fa fa-location-dot"></i> {location}
                </p>
                <span>{type}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NewsCard;

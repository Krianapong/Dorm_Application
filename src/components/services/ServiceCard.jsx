import React from "react";
import { Link } from "react-router-dom"; 
import "../services/service.css";

export const Service = [
  {
    cover: "../images/service/image-1.png",
    name: "Security",
  },
  {
    cover: "../images/service/image-2.png",
    name: "Housewife",
  },
  {
    cover: "../images/service/image-3.png",
    name: "Repairt",
  },
]


const FeaturedCard = () => {
  return (
    <>      
    <div className="content-user grid-service servicetop">
      {Service.map((item, index) => (
        <div className="box-service" key={index}>
          <Link to={`/${item.name.toLowerCase()}`}>
            <div className="image-container">
              <img className="img-service" src={item.cover} alt={item.name} />
              <h4 className="text-service">{item.name}</h4>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </>
  );
};

export default FeaturedCard;
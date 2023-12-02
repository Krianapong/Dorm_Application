import React from "react";
import { Link } from "react-router-dom"; 
import "../services/service.css";
import Heading from "../common/Heading";

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
     <Heading title='Services' subtitle='It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.' />
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
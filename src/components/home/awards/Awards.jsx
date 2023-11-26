import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faBriefcase, faLightbulb, faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import Heading from "../../common/Heading";
import "./awards.css";

export const awardsData = [
  {
    icon: <FontAwesomeIcon icon={faTrophy} />,
    num: "32 M",
    name: "Blue Burmin Award",
  },
  {
    icon: <FontAwesomeIcon icon={faBriefcase} />,
    num: "43 M",
    name: "Mimo X11 Award",
  },
  {
    icon: <FontAwesomeIcon icon={faLightbulb} />,
    num: "51 M",
    name: "Australian UGC Award",
  },
  {
    icon: <FontAwesomeIcon icon={faHeart} />,
    num: "42 M",
    name: "IITCA Green Award",
  },
];

const Awards = () => {
  return (
    <>
      <section className='awards padding'>
        <div className='container'>
          <Heading title='Over 1,24,000+ Happy Users Being With Us Still They Love Our Services' subtitle='Our Awards' />

          <div className='content grid4 mtop'>
            {awardsData.map((val, index) => (
              <div className='box' key={index}>
                <div className='icon'>
                  {index === 0 ? <FontAwesomeIcon icon={faSearch} /> : <span>{val.icon}</span>}
                </div>
                <h1>{val.num}</h1>
                <p>{val.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Awards;

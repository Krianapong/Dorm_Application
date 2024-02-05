import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedin, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt, faLocationDot, faCircleCheck } from "@fortawesome/free-solid-svg-icons"; // Import FortAwesome icons
import Heading from "../../common/Heading";
import "./team.css";

export const team = [
  {
    list: "50",
    cover: "../images/customer/team-1.jpg",
    address: "Liverpool, Canada",
    name: "Sargam S. Singh",
    icon: [
      <FontAwesomeIcon icon={faFacebookF} />,
      <FontAwesomeIcon icon={faLinkedin} />,
      <FontAwesomeIcon icon={faTwitter} />,
      <FontAwesomeIcon icon={faInstagram} />,
    ],
  },
  {
    list: "70",
    cover: "../images/customer/team-2.jpg",
    address: "Montreal, Canada",
    name: "Harijeet M. Siller",
    icon: [
      <FontAwesomeIcon icon={faFacebookF} />,
      <FontAwesomeIcon icon={faLinkedin} />,
      <FontAwesomeIcon icon={faTwitter} />,
      <FontAwesomeIcon icon={faInstagram} />,
    ],
  },
  {
    list: "80",
    cover: "../images/customer/team-3.jpg",
    address: "Denever, USA",
    name: "Anna K. Young",
    icon: [
      <FontAwesomeIcon icon={faFacebookF} />,
      <FontAwesomeIcon icon={faLinkedin} />,
      <FontAwesomeIcon icon={faTwitter} />,
      <FontAwesomeIcon icon={faInstagram} />,
    ],
  },
]

const Team = () => {
  return (
    <>
      <section className='team background'>
        <div className='container'>
          <Heading title='Our Featured Agents' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />

          <div className='content mtop grid3'>
            {team.map((val, index) => (
              <div className='box' key={index}>
                <button className='btn3'>{val.list} Listings</button>
                <div className='details'>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    <FontAwesomeIcon icon={faCircleCheck} className='fa-circle-check' />
                  </div>
                  <FontAwesomeIcon icon={faLocationDot} className='fa-location-dot' />
                  <label>{val.address}</label>
                  <h4>{val.name}</h4>

                  <ul>
                    {val.icon.map((icon, index) => (
                      <li key={index}>{icon}</li>
                    ))}
                  </ul>
                  <div className='button flex'>
                    <button>
                      <FontAwesomeIcon icon={faEnvelope} /> Message
                    </button>
                    <button className='btn4'>
                      <FontAwesomeIcon icon={faPhoneAlt} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
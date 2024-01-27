import React, { useEffect, useState } from 'react';
import img from "../../images/services.jpg"
import Back from "../common/Back"
import "../home/featured/Featured.css"
import Cost from "./Cost"
import Heading from "../common/Heading"

const CostCard = () => {
  const [field5Values, setField5Values] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.thingspeak.com/channels/429105/fields/5.json?results=12');
        const result = await response.json();
        const field5Data = result.feeds.map(feed => feed.field5);
        setField5Values(field5Data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <>
      <section className='blog-out mb'>
        <Back name='Cost Of Utilities' title='Cost Of Utilities - Our Cost Of Utilities' cover={img} />
        <section className='recent padding'>
          <Heading title='Cost Of Utilities' subtitle='It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.' />

          <div className='container'>
              <Cost />
            </div>
        </section>
      </section>
    </>
  )
}

export default CostCard
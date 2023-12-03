import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../../firebase"; // แทนที่ด้วย configuration ของ Firebase ที่คุณใช้

const RecentCard = () => {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];

        // ดึงข้อมูลโซนทั้งหมด
        const zonesSnapshot = await firestore.collection("zones").get(); // แทนที่ด้วยชื่อคอลเลคชันที่คุณใช้

        // วนลูปทุกรายการในโซน
        for (const zoneDoc of zonesSnapshot.docs) {
          // ดึงข้อมูลห้องภายในแต่ละโซน
          const roomsSnapshot = await firestore
            .collection("zones")
            .doc(zoneDoc.id)
            .collection("rooms")
            .get();

          // วนลูปทุกรายการห้องและเก็บข้อมูล
          const zoneData = {
            id: zoneDoc.id,
            name: zoneDoc.data().name,
            rooms: roomsSnapshot.docs.map((roomDoc) => roomDoc.data()),
          };

          data.push(zoneData);
        }



        setZones(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {zones.map((zone) => (
        //<div key={zone.id}>
        //<h2>{zone.name}</h2>
        <div className='content grid3 mtop'>
          {zone.rooms.map((room, index) => {
            const { image, roomNumber, date, price, type, location} = room;
            return (
              <div className='box shadow' key={index}>
                <div className='img'>
                  <img src={image} alt='' />
                </div>
                <div className='text'>
                  <div className='category flex'>
                    <span style={{ background: type === "For Sale" ? "#25b5791a" : "#ff98001a", color: type === "For Sale" ? "#25b579" : "#ff9800" }}>{type}</span>
                  </div>
                  <h4>ห้อง {roomNumber}</h4>
                  <p>
                    <i className='fa fa-location-dot'></i> ชั้น {location}
                  </p>
                </div>
                <div className='button flex'>
                  
                  <div>
                    <Link to={`/details/${roomNumber}`} >
                      <button className='btn2'>{price}</button>
                    </Link>{" "}
                    <label htmlFor=''>/บาท</label>
                  </div>
                  <span>{date}</span>
                </div>
              </div>
            );
          })}
        </div>
       // </div>
      ))}
    </>
  );
};

export default RecentCard;
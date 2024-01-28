import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { firestore } from "../../../firebase";
import { Link } from "react-router-dom";
import { Dna } from 'react-loader-spinner'

const RecentCard = () => {
  const category = "For Sale";
  const [roomInfo, setRoomInfo] = useState([]);
  const [Loading, setLoading] = useState(false)
  useEffect(() => {
    try {
      const fetchData = async () => {
        const collRef = firestore.collection('rooms').where('status', '==', 'Vacant');
        const querySnapshot = await collRef.get();
        const InfoRoom = [];
        setLoading(true);
      
        await Promise.all(
          querySnapshot.docs.map(async (docs) => {
            const id = docs.id;
            const type = docs.data().type;
            const status = docs.data().status;
      
            const docRef = await firestore.collection('typerooms').doc(type).get();
            if (docRef.exists) {
              const imgPath = `https://firebasestorage.googleapis.com/v0/b/hopak-8af20.appspot.com/o/types_image%2F${type}%2F${type}?alt=media&token=${docRef.data().token}`;
              const data = {
                roomNumber: id,
                roomType: docRef.data().name,
                roomStatus: status,
                roomPrice: docRef.data().price,
                roomLocation: docRef.data().location,
                roomImg: imgPath,
              }
      
              InfoRoom.push(data);
            } else {
              console.log('ไม่พบข้อมูลชนิดห้องพัก');
            }
          })
        )
        setRoomInfo(InfoRoom);
        setLoading(false);
      };
      
      fetchData();
    } catch (error) {
      console.log('ดึงข้อมูลห้องพักผิดพลาด: ', error);
    }
  }, []);

  if (Loading === true) {
    return (
      <>
        <div className="Loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <>
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='content grid3 mtop'>
          {roomInfo.map((data) => {
            return (
              <div className='box shadow' key={data.roomNumber}>
                <div className='img'>
                  <img src={data.roomImg} alt='' />
                </div>
                <div className='text'>
                  <div className='category flex'>
                    <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>
                      {data.roomStatus}
                    </span>
                  </div>
                  <h4>ห้องพัก {data.roomNumber} ชนิดห้อง {data.roomType}</h4>
                  <p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />  {data.roomLocation}
                  </p>
                </div>
                <div className='button flex'>
                  <div>
                    <Link to={'/roomdetail'} state={{
                      roomNumber: data.roomNumber,
                      roomLocation: data.roomLocation,
                      roomStatus: data.roomStatus,
                      roomPrice: data.roomPrice,
                      roomType: data.roomType,
                      roomImg: data.roomImg  // Corrected from data.imgPath
                    }}>
                      <button className="btn2">{data.roomPrice}</button>
                    </Link>


                  </div>
                  <span>{data.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  }
}

export default RecentCard
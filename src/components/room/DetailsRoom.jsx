import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './RoomDetail.css';
import ReactModal from 'react-modal';
import { firestore, storage, auth } from "../../firebase";

const RoomDetail = () => {
  const location = useLocation();
  const { roomNumber, roomLocation, roomStatus, roomPrice, roomType, roomImg } = location.state;

  const [modalBooking, setModalBooking] = useState(false);
  const [fileupload, setfileupload] = useState(null);

  const timestamp = Date.now();
  const timestampString = timestamp.toString();

  const OwnerUid = auth.currentUser.uid;

  function handleOpen() {
    setModalBooking(true);
  }

  function handleClose() {
    setModalBooking(false);
    setfileupload(null);
  }

  function handleFileInput(e) {
    if (e.target.files[0]) {
      setfileupload(e.target.files[0]);
    }
  }

  async function handleBookroom() {
    try {
      const filename = `${roomNumber}_${roomType}_${timestampString}`
      const ImgRef = await storage.ref().child(`slip_image/${filename}`);

      // FormattedDate
      const datein = document.querySelector('#starttime').value;
      const timeToStayInput = document.querySelector('input[name="timetostay"]:checked');
      const timeToStay = timeToStayInput ? timeToStayInput.value : null;

      const startDate = new Date(datein);

      const startDateDay = startDate.getDate();
      const startDateMonth = startDate.getMonth() + 1;
      const startDateYear = startDate.getFullYear();

      const formattedStartDate = `${startDateDay}/${startDateMonth}/${startDateYear}`;

      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + parseInt(timeToStay));
      const endDateDay = endDate.getDate();
      const endDateMonth = endDate.getMonth() + 1;
      const endDateYear = endDate.getFullYear();

      const formattedEndDate = `${endDateDay}/${endDateMonth}/${endDateYear}`;
      //End FormattedDate

      if (ImgRef.put(fileupload)) {
        alert('Booking a room success');

        firestore.collection('rooms').doc(roomNumber).update({
          status: 'Assign',
          owner: OwnerUid,
          img: filename,
          datein: formattedStartDate,
          dateout: formattedEndDate
        })

      } else {
        alert('Booking a room failed');
      }
      handleClose();
    } catch (error) {
      console.log('error booking a room : ', error)
    }
  }

  return (
    <div className="main-room">
      <div className="room-body">
        <div>
          <img src={roomImg} alt={roomNumber} className="img-room" />
          <div className="room-header">
            <text className="room-title">เลขห้อง {roomNumber}</text><br />
          </div>
          <div className="room-detail">
            <text className="room1">รายละเอียด</text><br />
            <text className="room-ll">{roomStatus}</text><br /><br />
            <text className="room1">ราคา</text><br />
            <text className="room-price">{roomPrice} บาท</text><br /><br />
            <text className="room1">ประเภทห้อง</text><br />
            <text className="room-type">{roomType}</text><br /><br />
            <text className="room1">ที่อยู่ห้อง</text><br />
            <text className="room-location">{roomLocation}</text>
          </div>
          <div className="footer-room">
            <button className="room-button" onClick={handleOpen}>Booking</button>
          </div>
          <ReactModal
            isOpen={modalBooking}
            onRequestClose={handleClose}
            contentLabel={`Booking Room ${roomNumber}`}
            className="custom-modal"
          >
            <p>Booking Room {roomNumber}</p>
            <div class="container-room-detail">
              <div class="left-room">
                <img src="https://images.ctfassets.net/lzny33ho1g45/6TK1TbLNZQ4iHr0PjdZS2Y/ffb5c5646b914435f10b085b012bc78d/zap-qr-1.png?w=1400" alt="QrCode" />
                <p>
                  <span>**กรุณาใส่หมายเหตุว่าเป็นค่ามัดจำตามด้วยห้องพักและชื่อหอพัก**</span>
                </p>
                <p>ราคามัดจำ : {roomPrice * 3}</p>
                <p>ราคาห้อง : {roomPrice}</p>
                <p>ราคามัดจำ : {roomPrice * 4}</p>
              </div>
              <div class="right-room">
                <input type='file' placeholder='รายละเอียด' id='text' onChange={handleFileInput}></input>
                <img src={fileupload === null ? 'https://via.placeholder.com/150' : URL.createObjectURL(fileupload)} alt="Uploaded" />
                <p>วันที่เข้าพัก</p>
                <input type='datetime-local' id='starttime'></input>
                <p>เลือกระยะเวลาที่เข้าพัก:</p>
                <input type="radio" value="3" name="timetostay" /> 3 เดือน.
                <input type="radio" value="6" name="timetostay" /> 6 เดือน.
                <input type="radio" value="12" name="timetostay" /> 1 ปี.
              </div>
            </div>

            <button onClick={handleBookroom} className="add-room-button">
              Book a room
            </button>
            <button onClick={handleClose} className="close-button">
              Close
            </button>
          </ReactModal>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
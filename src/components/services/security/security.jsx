import React, { useState, useEffect } from "react";
import "./service.css";
import ServiceDetails from "../ServiceDetails";
import { Modal, Button } from "react-bootstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import PaymentModal from "../PaymentModal";

const Service = () => {
  const userUID = firebase.auth().currentUser.uid;
  const db = firebase.firestore();
  const profilesRef = db.collection("profiles");
  const roomsRef = db.collection("rooms");

  const [selectedServices, setSelectedServices] = useState({
    catchDangerousAnimals: false,
    environmentProtection: false,
    foodDelivery: false,
  });

  const [foodDeliveryPrice, setFoodDeliveryPrice] = useState(20);
  const [environmentProtectionPrice, setEnvironmentProtectionPrice] =
    useState(0);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [confirmation, setConfirmation] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const [hasMultipleRooms, setHasMultipleRooms] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  const [userRooms, setUserRooms] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileDoc = await profilesRef.doc(userUID).get();
        const profileData = profileDoc.data();
        if (profileData) {
          setUserName(profileData.name);
          setUserPhone(profileData.phone);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์: ", error);
      }
    };

    const fetchRoomData = async () => {
      try {
        const roomsSnapshot = await db.collection("rooms").get();
        const roomNumbers = roomsSnapshot.docs.map((doc) => doc.data().numroom);
        const roomNumbersString = roomNumbers.join(", ");
        setRoomNumber(roomNumbersString);

        if (roomNumbers.length > 1) {
          setHasMultipleRooms(true);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลห้อง: ", error);
      }
    };

    const fetchUserRooms = async () => {
      try {
        const userRoomsSnapshot = await db
          .collection("rooms")
          .where("owner", "==", userUID)
          .get();
        const userRoomsData = userRoomsSnapshot.docs.map((doc) => doc.data());
        setUserRooms(userRoomsData);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลห้องของผู้ใช้: ", error);
      }
    };

    fetchProfileData();
    fetchRoomData();
    fetchUserRooms();
  }, [userUID, profilesRef, db]);

  const handleCheckboxChange = (service) => {
    setSelectedServices({
      ...selectedServices,
      [service]: !selectedServices[service],
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageSrc = e.target.result;
        setImageUrl(imageSrc);
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePayment = async () => {
    const user = firebase.auth().currentUser;

    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    try {
      const servicesRef = db
        .collection("Services")
        .doc("Security")
        .collection(user.uid);

      const serviceData = {
        title: "Security",
        selectedServices,
        totalAmount: calculateTotalAmount(),
        imageUrl: "",
        name: userName,
        phone: userPhone,
        status: "ยังไม่เสร็จ",
        numroom: hasMultipleRooms ? selectedRoom : roomNumber,
      };

      if (selectedFile) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`images/${selectedFile.name}`);

        await fileRef.put(selectedFile);
        console.log("อัปโหลดรูปภาพเสร็จสิ้น");

        const imageUrl = await fileRef.getDownloadURL();
        setImageUrl(imageUrl);

        serviceData.imageUrl = imageUrl;
      }

      await servicesRef.add(serviceData);

      console.log("บริการถูกเพิ่มลงใน Firestore");
      setConfirmation(true);
    } catch (error) {
      console.error("เกิดข้อผิดพลาด: ", error);
    }
  };

  const calculateTotalAmount = () => {
    return (
      (selectedServices.catchDangerousAnimals ? 20 : 0) +
      (selectedServices.environmentProtection ? 0 : 0) +
      (selectedServices.foodDelivery ? foodDeliveryPrice : 0)
    );
  };

  const totalAmount =
    (selectedServices.catchDangerousAnimals ? 20 : 0) +
    (selectedServices.environmentProtection ? 0 : 0) +
    (selectedServices.foodDelivery ? foodDeliveryPrice : 0);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container-blog">
        <h1>บริการรักษาความปลอดภัย</h1>
        <button className="top-right-button" onClick={handleOpenModal}>
          ชำระเงิน
        </button>
        <div className="sections-container">
          <section className="section1">
            <div className="security-header">
              <text className="security-text">หัวข้อการบริการ</text>
            </div>
            <label className="security-label">
              <input
                className="custom-checkbox"
                type="checkbox"
                checked={selectedServices.catchDangerousAnimals}
                onChange={() => handleCheckboxChange("catchDangerousAnimals")}
              />
              บริการจับสัตว์อันตราย (ราคา: 20 บาท)
            </label>
            <br />
            <label className="security-label">
              <input
                className="custom-checkbox"
                type="checkbox"
                checked={selectedServices.environmentProtection}
                onChange={() => handleCheckboxChange("environmentProtection")}
              />
              บริการรักษาสิ่งแวดล้อมบริเวณหอ (ฟรี)
            </label>
            <br />
            <label className="security-label">
              <input
                className="custom-checkbox"
                type="checkbox"
                checked={selectedServices.foodDelivery}
                onChange={() => handleCheckboxChange("foodDelivery")}
              />
              บริการนำอาหารและเครื่องไปส่งที่ห้อง (ราคา: {foodDeliveryPrice}{" "}
              บาท)
            </label>
            <div className="security-img">
              <div className="security-header">
                <text className="security-text">อัปโหลดรูปภาพ</text>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="security-input"
              />
              <img
                className="security-imageUrl"
                src={imageUrl || "https://via.placeholder.com/150"}
                alt="Uploaded"
              />
            </div>
          </section>
          <div className="sections-main">
            <section className="section2">
              <div className="security-head">
                <text className="security-text">หัวข้อที่รับบริการ</text>
              </div>
              <ServiceDetails selectedServices={selectedServices} />
              <text className="total-price">ยอดรวม: {totalAmount} บาท</text>
            </section>
            <section className="section3">
              <div className="security-head">
                <text className="security-text">รายเอียดการบริการ</text>
              </div>
              <text className="left-align">
                เวลาให้บริการ : 08.00 - 20.00 น.
              </text>
              <br />
              <text className="left-align">
                **ไม่พร้อมให้บริการในวันหยุด เสาร์ อาทิตย์ และวันหยุดนักขัตฤกษ
                **
              </text>
            </section>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดการบริการ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServiceDetails selectedServices={selectedServices} />
          <p>ยอดรวม: {totalAmount} บาท</p>
          {hasMultipleRooms && (
            <div>
              <label htmlFor="roomSelect">เลือกห้อง:</label>
              <select
                id="roomSelect"
                onChange={(e) => setSelectedRoom(e.target.value)}
                value={selectedRoom}
              >
                {userRooms.map((room) => (
                  <option key={room.numroom} value={room.numroom}>
                    Room {room.numroom}
                  </option>
                ))}
              </select>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePayment}>
            ยืนยัน
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            ยกเลิก
          </Button>
        </Modal.Footer>
        {confirmation && <div>รายการถูกยืนยันแล้ว</div>}
      </Modal>
      
    </>
  );
};

export default Service;

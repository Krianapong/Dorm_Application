import React, { useState, useEffect } from "react";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "../Global.css";
import Heading from "../../common/Heading";
import ReactModal from "react-modal";
import { auth, firestore, storage } from "../../../firebase";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
const Housewife = () => {
  const cleaningServices = [
    { name: "บริการทำความสะอาดห้อง", price: 150 },
    { name: "บริการซักผ้า", price: 80 },
    { name: "บริการอบผ้า", price: 80 },
    { name: "บริการล้างจาน", price: 100 },
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const unsubscribeBookings = firestore
      .collection("bookings")
      .onSnapshot((snapshot) => {
        const bookedRoomsData = snapshot.docs.map((doc) => doc.data().room);
        setBookedRooms(bookedRoomsData);
      });

    return () => {
      unsubscribeBookings();
    };
  }, []);

  useEffect(() => {
    const userId = auth.currentUser?.uid;

    if (userId) {
      const unsubscribeProfile = firestore
        .collection("profiles")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setUserProfile(doc.data());
          } else {
            console.log("No such document!");
          }
        });

      const unsubscribeRooms = firestore
        .collection("rooms")
        .where("owner", "==", userId)
        .onSnapshot((snapshot) => {
          const roomsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRooms(roomsData);
        });

      return () => {
        unsubscribeProfile();
        unsubscribeRooms();
      };
    }
  }, [auth.currentUser]);

  const handleServiceSelection = (serviceName, price) => {
    const isSelected = selectedServices.includes(serviceName);

    if (isSelected) {
      setSelectedServices(
        selectedServices.filter((service) => service !== serviceName)
      );
    } else {
      setSelectedServices([...selectedServices, serviceName]);
      // ให้แสดง Alert MUI เมื่อเลือกบริการ
      setAlertMessage(`คุณเลือกบริการ: ${serviceName}`);
      setShowAlert(true);
    }
  };

  const calculateTotalAmount = () => {
    const totalAmount = selectedServices.reduce((acc, serviceName) => {
      const selectedService = cleaningServices.find(
        (service) => service.name === serviceName
      );
      return acc + (selectedService ? selectedService.price : 0);
    }, 0);

    return totalAmount;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRoomSelection = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handlePayment = async () => {
    try {
      const userId = auth.currentUser.uid;

      // Fetch user's profile data
      const userDoc = await firestore.collection("profiles").doc(userId).get();
      const userProfile = userDoc.data();
      const imageRef = storage.ref(`Services/Housewife/${userId}/image.jpg`);
      await imageRef.putString(imageUrl, 'data_url');

      // Additional information to be added to the payment
      const paymentInfo = {
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        phone: userProfile.phone,
        selectedServices,
        title: "cleaningService",
        totalAmount: calculateTotalAmount(),
        imageUrl: `Services/Housewife/${userId}/image.jpg`, // Updated image URL
        status: "pending",
        selectedRoom: selectedRoom ? selectedRoom.id : null,
      };

      // Save payment information in Firestore under /profiles/Housewife/uid
      await firestore
        .collection("Services")
        .doc("Housewife")
        .collection(userId)
        .add(paymentInfo);

      // Close the modal or perform any other necessary actions
      handleCloseModal();
    } catch (error) {
      console.error("Error processing payment:", error.message);
    }
  };

  return (
    <>
      <div className="container flex mtop">
        <div className="left row">
          <Heading title="Housewife" />
          <div className="services-card">
            <div className="services-container">
              <div className="upload-container">
                <section className="section1">
                  <div className="service-title">
                    <h2>หัวข้อการบริการ</h2>
                  </div>
                  {cleaningServices.map((service, index) => (
                    <label key={index} className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        onChange={() =>
                          handleServiceSelection(service.name, service.price)
                        }
                      />
                      {`${service.name} (ราคา: ${service.price} บาท)`}
                    </label>
                  ))}
                  <div className="upload-section">
                    <div className="upload-title">
                      <h2>อัปโหลดรูปภาพ</h2>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input"
                      onChange={handleImageUpload}
                    />
                    <img
                      className="uploaded-image"
                      src={imageUrl || "https://via.placeholder.com/150"}
                      alt="Uploaded"
                    />
                  </div>
                </section>
                <section className="section2">
                  <div className="service-title">
                    <h2>หัวข้อที่รับบริการ</h2>
                  </div>
                  <p className="service-details">
                    {selectedServices.length > 0
                      ? selectedServices.map((service, index) => (
                          <span key={index}>
                            {service} (ราคา:{" "}
                            {
                              cleaningServices.find(
                                (cleaningService) =>
                                  cleaningService.name === service
                              )?.price
                            }{" "}
                            บาท)
                            {index < selectedServices.length - 1 && <br />}
                          </span>
                        ))
                      : "ยังไม่มีบริการที่เลือก"}
                  </p>
                  <p className="total-amount">
                    ยอดรวม: {calculateTotalAmount()} บาท
                  </p>
                </section>
                <section className="section3">
                  <div className="service-title">
                    <h2>รายเอียดการบริการ</h2>
                  </div>
                  <p className="service-details">
                    เวลาให้บริการ: 08.00 - 20.00 น.
                  </p>
                  <p className="service-details">
                    **ไม่พร้อมให้บริการในวันหยุด เสาร์ อาทิตย์
                    และวันหยุดนักขัตฤกษ**
                  </p>
                </section>
              </div>
              <button className="payment-button" onClick={handleOpenModal}>
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
        className="custom-modal"
      >
        <div>
          <h1 className="custom-modal-title">รายละเอียดการบริการ</h1>
          <section className="section4">
            <div className="service-title">
              <h2>เลือกห้อง</h2>
            </div>
            <div className="rooms-container">
              <FormControl fullWidth>
                <Select
                  value={selectedRoom}
                  onChange={handleRoomSelection}
                  displayEmpty
                  inputProps={{ "aria-label": "Select Room" }}
                >
                  <MenuItem value="" disabled>
                    เลือกห้อง
                  </MenuItem>
                  {rooms.map((room) => (
                    <MenuItem key={room.id} value={room}>
                      Room {room.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </section>
          <div className="custom-modal-body">
            <p className="service-details">
              {selectedServices.length > 0
                ? selectedServices.map((service, index) => (
                    <span key={index}>
                      {service} (ราคา:{" "}
                      {
                        cleaningServices.find(
                          (cleaningService) => cleaningService.name === service
                        )?.price
                      }{" "}
                      บาท)
                      {index < selectedServices.length - 1 && <br />}
                    </span>
                  ))
                : "ยังไม่มีบริการที่เลือก"}
            </p>
            <p className="total-amount">ยอดรวม: {calculateTotalAmount()} บาท</p>
          </div>
          <div className="custom-modal-footer">
            <button className="custom-modal-buttons-a" onClick={handlePayment}>
              ยืนยัน
            </button>
            <button
              className="custom-modal-buttons-c"
              onClick={handleCloseModal}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Housewife;

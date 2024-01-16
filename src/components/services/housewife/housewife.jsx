import React, { useState, useEffect } from "react";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "../Global.css";
import Heading from "../../common/Heading";
import ReactModal from "react-modal";
import { auth, firestore } from "../../../firebase";

const Housewife = () => {
  const cleaningServices = [
    { name: 'บริการทำความสะอาดห้อง', price: 150 },
    { name: 'บริการซักผ้า', price: 80 },
    { name: 'บริการอบผ้า', price: 80 },
    { name: 'บริการล้างจาน', price: 100 },
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const userId = auth.currentUser.uid;

    const unsubscribe = firestore.collection("profiles").doc(userId).onSnapshot((doc) => {
      if (doc.exists) {
        setUserProfile(doc.data());
      } else {
        console.log("No such document!");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleServiceSelection = (serviceName, price) => {
    const isSelected = selectedServices.includes(serviceName);

    if (isSelected) {
      setSelectedServices(selectedServices.filter((service) => service !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const calculateTotalAmount = () => {
    const totalAmount = selectedServices.reduce((acc, serviceName) => {
      const selectedService = cleaningServices.find((service) => service.name === serviceName);
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

  const handlePayment = async () => {
    try {
      const userId = auth.currentUser.uid;

      // Fetch user's profile data
      const userDoc = await firestore.collection("profiles").doc(userId).get();
      const userProfile = userDoc.data();

      // Additional information to be added to the payment
      const paymentInfo = {
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        numroom: userProfile.numroom, // Assuming numroom is a property of the profile
        phone: userProfile.phone,
        selectedServices,
        title: "cleaningService",
        totalAmount: calculateTotalAmount(),
        imageUrl,
        status: "pending", // You can set an initial status for the payment
      };

      // You can now use the paymentInfo data for further processing (e.g., storing in the database)
      console.log("Payment Information:", paymentInfo);

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
          <Heading title="Repairt" />
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
                        onChange={() => handleServiceSelection(service.name, service.price)}
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
                    {selectedServices.length > 0 ? (
                      selectedServices.map((service, index) => (
                        <span key={index}>
                          {service} (ราคา: {
                            cleaningServices.find((cleaningService) => cleaningService.name === service)?.price
                          } บาท)
                          {index < selectedServices.length - 1 && <br />}
                        </span>
                      ))
                    ) : (
                      'ยังไม่มีบริการที่เลือก'
                    )}
                  </p>
                  <p className="total-amount">ยอดรวม: {calculateTotalAmount()} บาท</p>
                </section>
                <section className="section3">
                  <div className="service-title">
                    <h2>รายเอียดการบริการ</h2>
                  </div>
                  <p className="service-details">
                    เวลาให้บริการ: 08.00 - 20.00 น.
                  </p>
                  <p className="service-details">
                    **ไม่พร้อมให้บริการในวันหยุด เสาร์ อาทิตย์ และวันหยุดนักขัตฤกษ**
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
          <div className="custom-modal-body">
            <p className="service-details">
              {selectedServices.length > 0 ? (
                selectedServices.map((service, index) => (
                  <span key={index}>
                    {service} (ราคา: {cleaningServices.find((cleaningService) => cleaningService.name === service)?.price} บาท)
                    {index < selectedServices.length - 1 && <br />}
                  </span>
                ))
              ) : (
                'ยังไม่มีบริการที่เลือก'
              )}
            </p>
            <p className="total-amount">ยอดรวม: {calculateTotalAmount()} บาท</p>
          </div>
          <div className="custom-modal-footer">
            <button className="custom-modal-buttons-a" onClick={handlePayment}>ยืนยัน</button>
            <button className="custom-modal-buttons-c" onClick={handleCloseModal}>
              ยกเลิก
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Housewife;
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "../Global.css";
import Heading from "../../common/Heading";
import ReactModal from "react-modal";

const Security = () => {
  const securityServices = [
    { name: 'บริการจับสัตว์อันตราย', price: 0 },
    { name: 'การตรวจสอบเข้า-ออก 24 ชั่วโมง', price: 100 },
    { name: 'การติดตั้งระบบกล้องวงจรปิด', price: 2000 },
    { name: 'บริการรักษาความปลอดภัยด้วยพนักงานประจำ', price: 1500 },
    { name: 'การตรวจสอบและรักษาความปลอดภัยของทรัพย์สิน', price: 800 },
  ];
  const [imageUrl, setImageUrl] = useState("");
  const [userName, setUserName] = useState(""); // เพิ่ม state สำหรับชื่อผู้ใช้
  const [userPhone, setUserPhone] = useState(""); // เพิ่ม state สำหรับเบอร์โทรผู้ใช้

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
      const selectedService = securityServices.find((service) => service.name === serviceName);
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

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePayment = async () => {
    try {
      const user = firebase.auth().currentUser;

      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      // เพิ่มการดึงข้อมูลผู้ใช้จาก Firestore
      const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();
      const userData = userDoc.data();

      if (userData) {
        setUserName(userData.name);
        setUserPhone(userData.phone);
      }

      // ทำการบันทึกข้อมูลลงใน Firestore
      const servicesRef = firebase.firestore().collection("Services").doc("Security").collection(user.uid);

      const serviceData = {
        title: "Security",
        selectedServices,
        totalAmount: calculateTotalAmount(),
        imageUrl: "",
        name: userName,
        phone: userPhone,
        status: "ยังไม่เสร็จ",
      };

      if (imageUrl) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`images/${user.uid}-${Date.now()}.jpg`);

        await fileRef.putString(imageUrl, "data_url");
        const imageUrl = await fileRef.getDownloadURL();
        serviceData.imageUrl = imageUrl;
      }
      console.log("Service Data:", serviceData);
      await servicesRef.add(serviceData);

      console.log("บริการถูกเพิ่มลงใน Firestore");
      setConfirmation(true);
    } catch (error) {
      console.error("เกิดข้อผิดพลาด: ", error);
    }
  };

  return (
    <>
      <div className="container flex mtop">
        <div className="left row">
          <Heading title="Security" />
          <div className="services-card">
            <div className="services-container">
              <div className="upload-container">
                <section className="section1">
                  <div className="service-title">
                    <h2>บริการทําความสะอาด</h2>
                  </div>
                  {securityServices.map((service, index) => (
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
                            securityServices.find((securityServices) => securityServices.name === service)?.price
                          } บาท)
                          {index < selectedServices.length - 1 && <br /> }
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
                    {service} (ราคา: {securityServices.find((cleaningService) => cleaningService.name === service)?.price} บาท)
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
            <button className="custom-modal-buttons-a" onClick={handlePayment}>
              ยืนยัน
            </button>
            <button className="custom-modal-buttons-c" onClick={handleCloseModal}>
              ยกเลิก
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Security;

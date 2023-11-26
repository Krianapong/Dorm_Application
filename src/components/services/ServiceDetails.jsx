import React from "react";
import "./ServiceDetails.css";
const ServiceDetails = ({ selectedServices }) => {
  return (
    <div>
      {selectedServices.catchDangerousAnimals && (
        <div>
          <text className="left-align">บริการจับสัตว์อันตราย</text>
        </div>
      )}
      {selectedServices.environmentProtection && (
        <div>
          <text className="left-align">บริการรักษาสิ่งแวดล้อมบริเวณหอ</text>
        </div>
      )}
      {selectedServices.foodDelivery && (
        <div>
          <text className="left-align">บริการนำอาหารและเครื่องไปส่งที่ห้อง</text>
        </div>
      )}
      {selectedServices.cleaning && (
        <div>
          <text className="left-align">บริการทำความสะอาดห้อง</text>
        </div>
      )}
      {selectedServices.laundry && (
        <div>
          <text className="left-align">บริการซักผ้า</text>
        </div>
      )}
      {selectedServices.dishwashing && (
        <div>
          <text className="left-align">บริการล้างจาน</text>
        </div>
      )}
      {selectedServices.Repair && (
        <div>
          <text className="left-align">ซ่อมลูกบิดประตู</text>
        </div>
      )}
      {selectedServices.cleanAir && (
        <div>
          <text className="left-align">ล้างแอร์</text>
        </div>
      )}
      {selectedServices.Flush && (
        <div>
          <text className="left-align">ล้างซิงค์ห้องน้ำ</text>
        </div>
      )}
      {selectedServices.Order && (
        <div>
          <text className="left-align">อื่นๆ</text>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
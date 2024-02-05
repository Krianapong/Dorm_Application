import React from "react";
import { Modal, Button } from "react-bootstrap";

const PaymentModal = ({
  show,
  onHide,
  selectedServices,
  totalAmount,
  userName,
  userPhone,
  roomNumber,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>รายละเอียดการบริการ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>รายการบริการที่เลือก:</p>
          <ul>
            {Object.entries(selectedServices).map(([service, selected]) => (
              selected && <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
        <p>ยอดรวม: {totalAmount} บาท</p>
        <p>ชื่อผู้ใช้: {userName}</p>
        <p>เบอร์โทร: {userPhone}</p>
        <p>หมายเลขห้อง: {roomNumber}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          ยืนยัน
        </Button>
        <Button variant="secondary" onClick={onHide}>
          ยกเลิก
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;

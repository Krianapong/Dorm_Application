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
    <Modal show={show} onHide={onHide} aria-labelledby="payment-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="payment-modal-title">รายละเอียดการบริการ</Modal.Title>
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
        <p>ยอดรวม: {totalAmount ? formatCurrency(totalAmount) : 'N/A'} บาท</p>
        <p>ชื่อผู้ใช้: {userName || 'N/A'}</p>
        <p>เบอร์โทร: {userPhone || 'N/A'}</p>
        <p>หมายเลขห้อง: {roomNumber || 'N/A'}</p>
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

// Function to format currency (e.g., add commas)
const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default PaymentModal;

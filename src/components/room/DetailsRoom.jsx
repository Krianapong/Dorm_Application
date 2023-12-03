import React from "react";
import { useParams } from "react-router-dom";

const DetailsRoom = () => {
  const { roomNumber } = useParams();

  return (
    <div>
      <h2>รายละเอียดห้อง {roomNumber}</h2>
    </div>
  );
};

export default DetailsRoom;

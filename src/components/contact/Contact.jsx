import React, { useState } from "react";
import { firestore } from "../../firebase";
import img from "../../images/pricing.jpg";
import Back from "../common/Back";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the data to the 'contacts' collection in Firestore
      await firestore.collection("contacts").add(formData);

      // Clear the form data after submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <section className='contact mb'>
        <Back name='Contact Us' title='Get Helps & Friendly Support' cover={img} />
        <div className='container'>
          <form className='shadow' onSubmit={handleSubmit}>
            <h4>Fillup The Form</h4> <br />
            <div>
              <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Name' />
              <input type='text' name='email' value={formData.email} onChange={handleChange} placeholder='Email' />
            </div>
            <input
              type='text'
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              placeholder='Subject'
            />
            <textarea
              name='message'
              value={formData.message}
              onChange={handleChange}
              cols='30'
              rows='10'
            ></textarea>
            <button type='submit'>Submit Request</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
// Profile.js
import React, { useState, useEffect } from "react";
import { auth, firestore, storage } from "../../firebase";
import "./profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    avatar: "", // Avatar URL is stored in Storage
    avatarFile: null,
  });

  useEffect(() => {
    const userId = auth.currentUser.uid;

    const unsubscribe = firestore.collection("profiles").doc(userId).onSnapshot((doc) => {
      if (doc.exists) {
        setUserData(doc.data());
        setLoading(false);
        setFormData({
          firstName: doc.data().firstName || "",
          lastName: doc.data().lastName || "",
          phone: doc.data().phone || "",
          avatar: doc.data().avatar || "",
          avatarFile: null,
        });
      } else {
        console.log("No such document!");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setFormData({
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      phone: userData?.phone || "",
      avatar: userData?.avatar || "",
      avatarFile: null,
    });
  };

  const handleSaveClick = async () => {
    const userId = auth.currentUser.uid;

    try {
      // Upload avatar if a new file is selected
      if (formData.avatarFile) {
        const avatarRef = storage.ref().child(`profile_user/${userId}`);
        await avatarRef.put(formData.avatarFile);
        const avatarURL = await avatarRef.getDownloadURL();
        
        // Update user data including the avatar URL
        await firestore.collection("profiles").doc(userId).update({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          avatar: avatarURL,
        });
      } else {
        // Update user data without modifying the avatar
        await firestore.collection("profiles").doc(userId).update({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        });
      }

      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      avatarFile: files ? files[0] : null,
    }));
  };

  return (
    <div className="card-profile">
    <div className="profile-container">
    <h2>User Profile</h2>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <>
        {userData ? (
          <>
            {editMode ? (
              <div className="edit-mode"> <div>
                <label>Avatar:</label>
                  <input type="file" name="avatarFile" onChange={handleInputChange}  className="input-edit"  />
                </div>
                <div>
                  <label>First Name:</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}  className="input-edit" />
                </div>
                <div>
                  <label>Last Name:</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}  className="input-edit"  />
                </div>
                <div>
                  <label>Phone:</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="input-edit" />
                </div>
               
                <div className="buttons">
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="view-mode">
                <div className="avatar-container">
                  {userData.avatar && <img src={userData.avatar} alt="Avatar" className="avatar" />}
                </div>

                <div>
                  <label className="text-view">First Name:</label>
                  <input type="text" name="firstName" value={userData.firstName} className="input-view" />
                </div>
                <div>
                  <label className="text-view">Last Name:</label>
                  <input type="text" name="lastName" value={userData.lastName} className="input-view"  />
                </div>
                <div>
                  <label className="text-view">Phone:</label>
                  <input type="text" name="phone" value={userData.phone} className="input-view" />
                </div>
                <div>
                  <button onClick={handleEditClick}>Edit Profile</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>No user data available.</p>
        )}
      </>
    )}
  </div>
  </div>
  );
};

export default Profile;

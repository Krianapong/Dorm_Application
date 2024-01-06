import React, { useState, useEffect } from "react";
import { auth, firestore, storage } from "../../firebase";
import "./profile.css";
import { Dna } from 'react-loader-spinner'

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    avatar: "",
    email: "",
    avatarFile: null,
  });
  const [roomsData, setRoomsData] = useState([]);

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
          email: doc.data().email || "",
          avatarFile: null,
        });
      } else {
        console.log("No such document!");
      }
    });

    // Fetch rooms data
    firestore.collection('rooms').where('owner', '==', userId).get().then((querySnapshot) => {
      const roomsData = [];
      querySnapshot.forEach((doc) => {
        const { numroom, status, type } = doc.data();
        roomsData.push({ numroom, status, type });
      });
      setRoomsData(roomsData);
    }).catch((error) => {
      console.log('error fetching room data: ', error)
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
      email: userData?.email || "",
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
    <div className="main-profile">
      <div className="profile-body">
        {loading ? (
          <>
            <div className="Loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Dna
                visible={true}
                height="200"
                width="200"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          </>
        ) : (
          <>
            {userData ? (
              <>
                {editMode ? (
                  <div>
                    {formData.avatarFile && (
                      <img src={URL.createObjectURL(formData.avatarFile)} alt="Selected Avatar" className="img-profile" />
                    )}
                    {userData.avatar && !formData.avatarFile && (
                      <img src={userData.avatar} alt="Avatar" className="img-profile" />
                    )}
                    <div className="profile-detail">
                      <text className="profile1">Avatar</text><br />
                      <input type="file" name="avatarFile" onChange={handleInputChange} className="input-edit" /><br />
                      <text className="profile1">First Name</text><br />
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="input-edit" /><br />
                      <text className="profile1">Last Name</text><br />
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="input-edit" /><br />
                      <text className="profile1">Phone</text><br />
                      <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="input-edit" /><br />
                    </div>
                    <div className="footer-profile">
                      <button onClick={handleSaveClick}>Save</button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {userData.avatar && <img src={userData.avatar} alt="Avatar" className="img-profile" />}
                    <div className="profile-detail">
                      <text className="profile1">Email</text><br />
                      <input type="text" name="firstName" value={formData.email} className="input-edit" /><br />
                      <text className="profile1">First Name</text><br />
                      <input type="text" name="firstName" value={formData.firstName} className="input-edit" /><br />
                      <text className="profile1">Last Name</text><br />
                      <input type="text" name="lastName" value={formData.lastName} className="input-edit" /><br />
                      <text className="profile1">Phone</text><br />
                      <input type="text" name="phone" value={formData.phone} className="input-edit" /><br /><br />
                      {roomsData.map((room, index) => (
                        <div key={index}>
                          <text className="profile1">ห้อง {room.numroom}</text><br />
                          <h4 className="profile-info">Status: {room.status}</h4>
                          <h4 className="profile-info">Type: {room.type}</h4>
                        </div>
                      ))}
                    </div>
                    <div className="footer-profile">
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

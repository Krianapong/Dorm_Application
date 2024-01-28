import React, { Component, createRef } from 'react';
import { getDatabase, onValue, off, push, ref, serverTimestamp } from 'firebase/database';
import { auth, firestore, storage } from '../../firebase';
import { Link } from "react-router-dom";
import './chat.css';

const database = getDatabase();

class ChatRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: [],
            text: '',
        };

        const currentUserID = auth.currentUser?.uid;
        this.messagesRef = ref(database, `/${currentUserID}`);
    }

    componentDidMount() {
        onValue(this.messagesRef, (snapshot) => {
            const messages = snapshot.val();
            if (messages) {
                this.setState({ chat: Object.values(messages) });
                this.scrollToBottom();
            }
        });
    }

    componentWillUnmount() {
        off(this.messagesRef);
    }

    scrollToBottom() {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    getUserData() {
        // Retrieve user data from Cloud Firestore based on the logged-in user
        const userId = auth.currentUser.uid; // Assuming you're using Firebase Authentication
        const userRef = firestore.collection("profiles").doc(userId);

        return userRef.get().then(async (doc) => {
            if (doc.exists) {
                const userData = doc.data();

                // Fetch avatar URL
                const avatarRef = storage.ref().child(`profiles_image/${userId}`);
                const avatarURL = await avatarRef.getDownloadURL();

                return {
                    _id: userId,
                    avatar: avatarURL,
                    email: userData.email,
                    name: `${userData.firstName} ${userData.lastName}`,
                };
            } else {
                console.log("No such document!");
                return null;
            }
        });
    }


    sendMessage = async () => {
        const userData = await this.getUserData();

        if (userData) {
            const newMessage = {
                createdAt: serverTimestamp(),
                user: userData,
                text: this.state.text,
            };

            // Push the new message to the user-specific node
            push(this.messagesRef, newMessage);

            this.setState({ text: '' });
        }
    };


    render() {
        const { chat, text } = this.state;
        const currentUserID = auth.currentUser?.uid;

        return (
            <div className="main__chatbody">
                <div className="main__chatlist">
                    <div className="chatList__search">
                        <div className="search_wrap">
                            <input type="text" placeholder="Search Here" required />
                            <button className="search-btn">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <Link to="/chat">
                        <div style={{ marginBottom: '10px' }} className="chatlist__item">
                            <div className="avatar">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" alt="User Avatar" />
                            </div>
                            <div className="userMeta">
                                <p>Dorm</p>
                                <span className="activeTime">เเชทภายในหอพัก</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="/chatroom">
                        <div style={{ marginBottom: '10px' }} className="chatlist__item">
                            <div className="avatar">
                                <div className="avatar">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" alt="User Avatar" />
                                </div>
                            </div>
                            <div className="userMeta">
                                <p>Admin</p>
                                <span className="activeTime">สอบถามรายละเอียดหอพัก</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="main__chatcontent">
                <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
            <div className="avatar">
                <div className="avatar">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" alt="User Avatar" />
                </div>
              </div>
              <p>Admin</p>
            </div>
          </div>
          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
                    <div className="content__body">
                        <div className="chat__items">
                            {chat.map((item) => (
                                <div
                                    key={item.createdAt}
                                    className={`chat__item ${item.user._id === currentUserID ? 'self' : 'other'}`}
                                >
                                    <div className="chat__item__content">
                                        <div className="chat__msg">{item.text}</div>
                                        <div className="chat__meta">
                                            <span>{item.createdAt}</span>
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="avatar-img">
                                            <img src={item.user.avatar} alt="#" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={this.messagesEndRef} />
                        </div>
                    </div>
                    <div className="content__footer">
                        <div className="sendNewMessage">
                            <input
                                type="text"
                                placeholder="Type a message here"
                                onChange={(e) => this.setState({ text: e.target.value })}
                                value={text}
                            />
                            <button className="btnSendMsg" onClick={this.sendMessage}>
                                <i className="fa fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="main__userprofile">
                    <div className="profile__card user__profile__image">
                        <div className="profile__image">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" alt="User Avatar" />
                        </div>
                        <h4>Fernando Faucho</h4>
                        <p>CEO & Founder at Highly Inc</p>
                    </div>
                    <div className="profile__card">
                        <div className="card__header" onClick={this.toggleInfo}>
                            <h4>Information</h4>
                            <i className="fa fa-angle-down"></i>
                        </div>
                        <div className="card__content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices urna a imperdiet egestas. Donec in magna quis ligula
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatRoom;
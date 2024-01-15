import React, { Component, createRef } from "react";
import "./chat.css";

export default class Chat extends Component {
    toggleInfo = (e) => {
        const card = e.target.closest('.profile__card');
        if (card) {
            card.classList.toggle('open');
        }
    };
    constructor(props) {
        super(props);

        // Initialize the state with an empty array for 'chat'
        this.state = {
            chat: [],
            // Other state properties if any
        };

        // Your other constructor code here
        // ...

        // Create a ref for scrolling to the end of the chat
        this.messagesEndRef = createRef();
    }
    render() {
        const chatItems = [
            {
                key: 1,
                image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
                type: "",
                msg: "Hi Tim, How are you?"
            },
            {
                key: 2,
                image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
                type: "other",
                msg: "I am fine."
            },
            {
                key: 3,
                image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
                type: "other",
                msg: "What about you?"
            },
            {
                key: 4,
                image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
                type: "",
                msg: "Awesome these days."
            },
            {
                key: 5,
                image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
                type: "other",
                msg: "Finally. What's the plan?"
            },
            {
                key: 6,
                image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
                type: "",
                msg: "what plan mate?"
            },
            {
                key: 7,
                image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
                type: "other",
                msg: "I'm taliking about the tutorial"
            }
        ];
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
                    <div style={{ animationDelay: `0.${this.props.animationDelay}s` }} onClick={this.selectChat} className={`chatlist__item ${this.props.active ? this.props.active : ""} `}>
                        <div className="avatar">
                            <div className="avatar-img">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" alt="User Avatar" />
                            </div>
                        </div>
                        <div className="userMeta">
                            <p>สมชาย ใจกล้า</p>
                            <span className="activeTime">32 mins ago</span>
                        </div>
                    </div>
                </div>
                <div className="main__chatcontent">
                    <div className="content__header">
                        <div className="blocks">
                            <div className="current-chatting-user">
                                <div className="avatar">
                                    <div className="avatar-img">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" alt="User Avatar" />
                                    </div>
                                </div>
                                <p>Tim Hover</p>
                            </div>
                        </div>
                    </div>
                    <div className="content__body">
                        <div className="chat__items">
                            {chatItems.map((item) => (
                                <div key={item.key} style={{ animationDelay: `0.8s` }} className={`chat__item ${item.type}`}>
                                    <div className="chat__item__content">
                                        <div className="chat__msg">{item.msg}</div>
                                        <div className="chat__meta">
                                            <span>16 mins ago</span>
                                            <span>Seen 1.03PM</span>
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="avatar-img">
                                            <img src={item.image} alt="User Avatar" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={this.messagesEndRef} />
                        </div>
                    </div>
                    <div className="content__footer">
                        <div className="sendNewMessage">
                            <button className="addFiles">
                                <i className="fa fa-plus"></i>
                            </button>
                            <input
                                type="text"
                                placeholder="Type a message here"
                                onChange={this.onStateChange}
                                value={this.state.msg}
                            />
                            <button className="btnSendMsg" id="sendMsgBtn">
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

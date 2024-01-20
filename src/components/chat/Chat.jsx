// Chat.jsx

import { Component } from 'react';
import './chat.css';

class Chat extends Component {
  
  render() {

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
          <div>
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
          <div className="content__body">
            <div className="chat__items">
              <div ref={this.messagesEndRef} />
            </div>
          </div>
          <div className="content__footer">
            <div className="sendNewMessage">
              <input
                type="text"
                placeholder="Type a message here"
               
              />
              <button className="btnSendMsg">
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

export default Chat;
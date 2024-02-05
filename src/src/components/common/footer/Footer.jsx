import React from "react"
import { footer } from "../../../data/Data"
import "./footer.css"
import Logo from "../../../images/HoPak_.png"

const Footer = () => {
  return (
    <>
      {/* <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
            <img src={Logo} alt="" style={{ width: '50px', height: 'auto' }} />
              <h2>Do You Need Help With Anything?</h2>
              <p>Receive updates, hot deals, tutorials, discounts sent straignt in your inbox every month</p>

              <div className='input flex'>
                <input type='text' placeholder='Email Address' />
                <button>Subscribe</button>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className='box'>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer> */}
      <div className='legal'>
        <span>© 2021 RentUP. Designd By GorkCoder.</span>
      </div> 
    </>
  )
}

export default Footer
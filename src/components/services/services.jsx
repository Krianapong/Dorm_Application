import React from "react"
import img from "../../images/services.jpg"
import Back from "../common/Back"
import "../home/featured/Featured.css"
import ServiceCard from "./ServiceCard"
import Heading from "../common/Heading"

const Service = () => {
  return (
    <>
      <section className='services mb'>
        <Back name='Services' title='Services -All Services' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <ServiceCard />
          </div>
        </div>
      </section>
    </>
  )
}

export default Service
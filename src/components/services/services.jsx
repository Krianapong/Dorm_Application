import React from "react"
import img from "../../images/services.jpg"
import Back from "../common/Back"
import "../home/featured/Featured.css"
import ServiceCard from "./ServiceCard"

const Service = () => {
  return (
    <>
      <section className='services mb'>
        <Back name='Services' title='Services -All Services' cover={img} />
        <div className="container-blog">
            <ServiceCard />
        </div>
      </section>
    </>
  )
}

export default Service
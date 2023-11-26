import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import RecentCard from "../home/recent/Recent"
import "../home/recent/recent.css"
import img from "../../images/about.jpg"

const Room = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Book A Room' title='Book a Room - Our Rooms' cover={img} />
            <RecentCard />
      </section>
    </>
  )
}

export default Room
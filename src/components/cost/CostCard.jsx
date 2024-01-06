import React from "react"
import img from "../../images/services.jpg"
import Back from "../common/Back"
import "../home/featured/Featured.css"
import Cost from "./Cost"
import Heading from "../common/Heading"

const CostCard = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Cost Of Utilities' title='Cost Of Utilities - Our Cost Of Utilities' cover={img} />
        <section className='recent padding'>
          <Heading title='Cost Of Utilities' subtitle='It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.' />
          <div className='container'>
              <Cost />
            </div>
        </section>
      </section>
    </>
  )
}

export default CostCard
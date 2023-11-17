import React from "react"
import Heading from "../../model/Heading"
import "./Featured.css"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  return (
    <>
      <section className='featured background'>
        <div className='container'>
          <Heading/>
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Featured

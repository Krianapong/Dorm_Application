import React from "react"
import Heading from "../../model/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Book A Room' subtitle='It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.' />
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Recent

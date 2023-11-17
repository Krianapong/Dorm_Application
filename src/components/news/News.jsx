import React from "react"
import Heading from "../model/Heading"
// import "./news.css"
import NewsCard from "./NewsCard"

const News = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Board & News' subtitle='It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.' />
          <NewsCard />
        </div>
      </section>
    </>
  )
}

export default News

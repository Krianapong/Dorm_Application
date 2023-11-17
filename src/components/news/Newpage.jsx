import React from "react"
import Back from "../model/Back"
import NewsCard from "./NewsCard"
import "./news.css"
import img from "../../images/about.jpg"

const NewsPage = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Board & News' title='It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.' cover={img} />
        <div className='container recent'>
          <NewsCard />
        </div>
      </section>
    </>
  )
}

export default NewsPage

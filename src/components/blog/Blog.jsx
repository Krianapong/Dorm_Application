import React from "react"
import Back from "../common/Back"
import BlogCard from "./BlogCard"
import "../home/recent/recent.css"
import img from "../../images/about.jpg"

const Blog = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Blog' title='Blog Grid - Our Blogs' cover={img} />
            <BlogCard />
      </section>
    </>
  )
}

export default Blog

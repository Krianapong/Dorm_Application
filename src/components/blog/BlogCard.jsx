import React from "react";
import { blog } from "../../data/Data";
import Heading from "../common/Heading";
import "./BlogCard.css";

const BlogCard = () => {
  return (
    <>
      <Heading title='Blog' subtitle='It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.' />
      <div className='container recent'>
        <div className='content grid3 mtop'>
          {blog.map((val, index) => {
            const { cover, title, description, time } = val;
            return (
              <div className="blog-card" key={index}>
                <img src={cover} alt={title} className="blog-card-image" />
                <div className="blog-card-content">
                  <h2 className="blog-card-title">{title}</h2>
                  <p className="blog-card-description">{description}</p>
                  <span className="blog-card-time">{time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BlogCard;

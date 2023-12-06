import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase"; // Make sure to import your Firestore instance
import Heading from "../common/Heading";
import "./BlogCard.css";

const fetchNewsFromFirestore = async () => {
  try {
    const newsCollection = await firestore.collection("news").get();
    const updatedNewsData = [];
    newsCollection.forEach((doc) => {
      const news = { id: doc.id, ...doc.data() };
      updatedNewsData.push(news);
    });
    return updatedNewsData;
  } catch (error) {
    console.error("Error fetching news from Firestore: ", error);
    return [];
  }
};

const ITEMS_PER_PAGE = 3;

const BlogCard = () => {
  const [firebaseNews, setFirebaseNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const newsPage = firebaseNews.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await fetchNewsFromFirestore();
        setFirebaseNews(newsData);
      } catch (error) {
        console.error("Error fetching news from Firestore: ", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(firebaseNews.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading
            title="Blog"
            subtitle="It is a long established fact that a reader will be distracted by the of readable content of a page when looking at its layouts the points of using."
          />
          <div className="content grid3 mtop">
            {newsPage.map((newsItem, index) => (
              <div className='box shadow' key={index}>
                <div className='img'>
                  <img src={newsItem.image} alt={newsItem.title} className="img-new"/>
                </div>
                <div className='text'>
                  <div className='category flex'>
                    <span style={{ background: newsItem.type === "For Sale" ? "#25b5791a" : "#ff98001a", color: newsItem.type === "For Sale" ? "#25b579" : "#ff9800" }}>{newsItem.type}</span>
                  </div>
                  <h4>{newsItem.title}</h4>
                  <p>
                    {newsItem.description}
                  </p>
                </div>
                <div className='button flex'>
                  <div>
                  </div>
                  <span>{newsItem.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              &#8249;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              &#8250;
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogCard;

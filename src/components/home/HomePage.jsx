import React from "react";
import Hero from "./hero/hero";
import Featured from "./featured/Featured";
import Recent from "./recent/Recent";
import News from "../news/News";
import Contact from "../contact/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
      <News />
      <Contact />
    </>
  );
};
export default Home;

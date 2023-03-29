import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../index.css";
import InfoGraphics from "../resources/DetailsUpdated.png";

const Carousel = () => {
  var settings = {
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
  };
  return (
    <Slider {...settings} draggable>
      <div>
        <img src={InfoGraphics} alt="" />
      </div>
    </Slider>
  );
};

export default Carousel;

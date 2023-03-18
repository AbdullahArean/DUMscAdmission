import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../index.css";

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
        <div
          className="carouselImage max-w-screen"
          style={{
            backgroundImage: `url("https://scontent.fdac31-1.fna.fbcdn.net/v/t1.18169-9/1004618_193058094192892_1572046677_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_eui2=AeHjVo2EJzk6uShFlbG5E0N-uAnq2HXNgD24CerYdc2APa7sZGezSBQ4xoCuTH9r0GRPJExnVP7NqKVc8uWDaswI&_nc_ohc=0IevPgdDj8gAX8JK2vc&_nc_ht=scontent.fdac31-1.fna&oh=00_AfB522w8XyTJWbo1zHj9aNipC8d7B4X0kIsMWjJzW0NSUQ&oe=643D908E")`,
          }}
        ></div>
      </div>
      <div>
        <div
          className="carouselImage max-w-screen"
          style={{
            backgroundImage: `url("https://scontent.fdac31-1.fna.fbcdn.net/v/t1.18169-9/994950_227077100790991_1489327391_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=19026a&_nc_eui2=AeHfENqsVKmgrP9Mef5rfQF-pzP5Fv1kwEKnM_kW_WTAQq78cd40JaN5DCylxCbpeEhZEjrymPJmrcRUhcm2P64W&_nc_ohc=AGCqvd02PDYAX-vyupW&_nc_oc=AQlKEpdKmO0NTo5iBRnJaXaqkR3w2Wsksv3JpQAAAaQrJJmTpB2TLMPq9PHfr0_zq4g&_nc_ht=scontent.fdac31-1.fna&oh=00_AfCIsB-fQzNY-Ce7QC8eRDLeeKmjy0W0QPg03-JjQlJ2mw&oe=643DA8F7")`,
          }}
        ></div>
      </div>
      <div>
        <div
          className="carouselImage max-w-screen"
          style={{
            backgroundImage: `url("https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/309048341_602405031677017_1180602171453018536_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeEKKkY65j7rw_qNHfaIWRzVghcdDx4hjJWCFx0PHiGMleFjQ7KRB-5g8Arg6x2gd13gK-Wgayuf2b_52G0KPvYl&_nc_ohc=crz2xMFm-_4AX8HNUQx&_nc_ht=scontent.fdac31-1.fna&oh=00_AfAubETzqY1mMHEFWDRcJv8ed-8u9rXx9ieJCkE0qr3KBg&oe=641A4E66")`,
          }}
        ></div>
      </div>
    </Slider>
  );
};

export default Carousel;

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YoutubeEmbed from "../YoutubeEmbed";
import "./styles.css";

var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const YoutubeSlide = () => (
  <Slider {...settings}>
    <div className="p-3">
      <YoutubeEmbed embedId="916GWv2Qs08" />
    </div>
    <div className="p-3">
      <YoutubeEmbed embedId="VyWAvY2CF9c" />
    </div>
    <div className="p-3">
      <YoutubeEmbed embedId="WPqXP_kLzpo" />
    </div>
    <div className="p-3">
      <YoutubeEmbed embedId="6g4O5UOH304" />
    </div>
    <div className="p-3">
      <YoutubeEmbed embedId="jcTj6FgWOpo" />
    </div>
    <div className="p-3">
      <YoutubeEmbed embedId="RGOj5yH7evk" />
    </div>
  </Slider>
);

export default YoutubeSlide;

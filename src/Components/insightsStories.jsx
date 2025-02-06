import React from "react";
import slider1 from "../../src/images/slider1.jpg";
import { FaTachographDigital } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";

const InsightsStories = () => {
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/insights");
  }
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  const slider = [
    {
      id: 1,
      img: slider1,
      name: "Meylitha",
      date: "May 2, 2023",
      description: "QuiD Cash Raises $4.5 Million in Pre-Series A Funding",
    },
    {
      id: 2,
      img: slider1,
      name: "Jackson",
      date: "May 2, 2023",
      description:
        "How This Founder Turned ₹18 Lakhs into ₹8 Crore in Revenue The Océglōw Success Story",
    },
    {
      id: 3,
      img: slider1,
      name: "Jonh Ali",
      date: "May 2, 2023",
      description:
        "Zuvelio Redefining Jewelry with Innovation and Sustainability   ",
    },
    {
      id: 4,
      img: slider1,
      name: "Jonh Ali",
      date: "May 2, 2023",
      description:
        " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
    },
  ];


  return (
    <div className="w-full h-full  mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-full xl:w-[70%] xl:h-[50%]">
      <div className="flex justify-between pt-10 w-full px-4  sm:w-full md:w-full xl:w-[90%] mx-auto">
        <div className="flex gap-2">
          <FaTachographDigital className="h-14 w-14 text-[#e64833]" />
          <div>
            <p className="font-semibold text-base sm:text-lg md:text-lg lg:text-xl">
              Insights
            </p>
            <p className="font-medium text-xs sm:text-base md:text-base lg:text-base xl:text-lg text-gray-600">
              Digging deeper in the accuracy
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handlenavigate}
          class=" px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border  dark:bg-white dark:text-black dark:border-[#e64833] dark:hover:text-white dark:hover:bg-[#e64833]"
        >
          View More
        </button>
      </div>
      <div className="slider-container px-6 sm:w-full hidden lg:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 justify-between md:w-full xl:w-[90%] mx-auto">
        {slider.map((val) => (
          <div
            key={val.id}
            className="relative grid justify-center col-span-1 mx-auto m-5 h-[370px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          >
            <a
              href="#"
              className="w-full relative mx-auto h-auto overflow-hidden rounded-lg"
            >
              <img
                className="rounded-t-xl w-full h-fit object-cover"
                src={val.img}
                alt={val.name}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-base tracking-tight text-gray-600 transition-colors duration-300">
                  {val.date}
                </h5>
              </a>
              <p className="mb-3 font-medium text-black h-20">
                {val.description}
              </p>
              <a
                href="#"
                className="inline-flex relative items-center px-4 py-2 text-sm font-medium text-red-500 bg-red-100 rounded-lg transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
              >
                STARTSUP
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="block lg:hidden">
      <Slider
        {...settings}
        className="slider-container px-6 sm:w-full md:w-full grid justify-center xl:w-[90%] mx-auto overflow-hidden"
      >
        {slider.map((val) => (
          <div
            key={val.id}
            className="relative sm:!w-[95%] md:!w-[95%] lg:!w-[314px] xl:!w-[305px] 2xl:!w-[345px] grid justify-center mx-auto m-5 h-[430px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          >
            <a
              href="#"
              className="w-full relative mx-auto h-auto overflow-hidden rounded-lg"
            >
              <img
                className="rounded-t-xl w-full h-[200px] object-cover"
                src={val.img}
                alt={val.name}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-base tracking-tight text-gray-600 transition-colors duration-300">
                  {val.date}
                </h5>
              </a>
              <p className="mb-3 font-medium text-black h-24">
                {val.description}
              </p>
              <a
                href="#"
                className="inline-flex relative items-center px-4 py-2 text-sm font-medium text-red-500 bg-red-100 rounded-lg transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
              >
                STARTSUP
              </a>
            </div>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  );
};

export default InsightsStories;

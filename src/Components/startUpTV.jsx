import React from "react";
import slider1 from "../../src/images/slider1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdRocket } from "react-icons/io";
import { GiTv } from "react-icons/gi";

const StartUpTV = () => {
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
          <GiTv className="h-14 w-14 text-[#e64833]" />
          <div>
            <p className="font-semibold text-base sm:text-lg md:text-lg lg:text-xl">
            Startup TV
            </p>
            <p className="font-medium text-xs sm:text-base md:text-base lg:text-base xl:text-lg text-gray-600">
            vision to keep you moving.
            </p>
          </div>
        </div>
        <button
          type="button"
          class=" px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border  dark:bg-white dark:text-black dark:border-[#e64833] dark:hover:text-white dark:hover:bg-[#e64833]"
        >
          View More
        </button>
      </div>
      <div>
        <img
          src={slider1}
          alt="StartUpTV"
          className="w-full h-full p-7  mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-full xl:w-[90%] xl:h-[50%]"
        />
      </div>
    </div>
  );
};

export default StartUpTV;

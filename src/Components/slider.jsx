import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from "../../src/images/slider1.jpg";

const Slidercursol = () => {
    const getCharacterLimit = () => {
        return window.innerWidth > 1024 ? 50 : 30; // 75 for large screens, 50 for laptop screens
      };

  const [characterLimit, setCharacterLimit] = useState(getCharacterLimit());
  const [mainSlider, setMainSlider] = useState(null);
  const [thumbnailSlider, setThumbnailSlider] = useState(null);

  const mainSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);

  useEffect(() => {
    setMainSlider(mainSliderRef.current);
    setThumbnailSlider(thumbnailSliderRef.current);

    const handleResize = () => {
      setCharacterLimit(getCharacterLimit());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    asNavFor: thumbnailSlider,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    // initialSlide: 0,
    // beforeChange: (_, next) => {
    //   setCurrentSlide(next); // Update the shared slide state
    //   if (thumbnailSlider.current) {
    //     thumbnailSlider.current.slickGoTo(next); // Sync thumbnail slider
    //   }
    // },
  };
  
  const settings1 = {
    asNavFor: mainSlider,
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: true,
    arrows: false,
    // asNavFor: mainSlider,
    // dots: true,
    // infinite: true,
    // speed: 1000,
    // slidesToShow: 3,
    // slidesToScroll: 1,
    // autoplay: false,
    // // autoplaySpeed: 2000,
    // // pauseOnHover: true,
    // arrows: false,
    // focusOnSelect: true,
    // initialSlide: 2, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          // slidesToScroll: 3,
          // infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          // slidesToScroll: 2,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          // slidesToScroll: 1,
        },
      },
    ],
    
  };

  const slider = [
    {
      id: 1,
      img: slider1,
      name: "Meylitha",
      description: "QuiD Cash Raises $4.5 Million in Pre-Series A Funding",
    },
    {
      id: 2,
      img: slider1,
      name: "Jackson",
      description:
        "How This Founder Turned ₹18 Lakhs into ₹8 Crore in Revenue The Océglōw Success Story",
    },
    {
      id: 3,
      img: slider1,
      name: "Jonh Ali",
      description: "From Jaipur to the World",
    },
    {
      id: 4,
      img: slider1,
      name: "Jonh Ali",
      description:
        " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
    },
    {
      id: 5,
      img: slider1,
      name: "Jonh Ali",
      description:
        " Jaipur to the World: The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
    },
    {
      id: 6,
      img: slider1,
      name: "Jonh Ali",
      description:
        " to the World: The Story of Zuvelio  Redefining Jewelry with Innovation and Sustainability",
    },
  ];

  //   const truncateText = (text, maxLength) => {
  //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  //   };

  

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className=" mt-32 justify-center items-center ">
      <div className=" w-full mx-auto ">
        <Slider {...settings}  ref={mainSliderRef} className="slider-container ">
          {slider.map((val) => (
            <div
              className="mx-auto animate-fade-in px-6 h-fit flex flex-col  justify-center items-center"
              key={val.id}
              data-aos="fade-up"
            >
              <img
                src={val.img}
                alt={val.name}
                className="w-full h-full  mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-full xl:w-[60%] xl:h-[50%]" // Adjusted size for responsiveness
                // className="w-[60%] h-[50%] mx-auto rounded-2xl" // Adjusted size for responsiveness
              />
              <p className="w-full text-black font-bold text-lg  mx-auto sm:w-full md:w-[60%] mt-4">
                {val.description}
              </p>
              <div className="w-full flex gap-4 items-center  mx-auto sm:w-full md:w-[60%] mt-4">
                <button class="relative inline-flex items-center justify-center font-semibold text-lg  px-5 py-2  overflow-hidden  text-gray-900 rounded-lg group bg-gradient-to-br from-red-900 to-[#e64833] group-hover:from-[#e64833] group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                  STORIES
                </button>
                <button className="bg-transparent text-black font-semibold text-lg px-3 py-2">
                  By StartupStory
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="mt-20 w-full mx-auto sm:block hidden ">
        <Slider
          {...settings1}
          ref={thumbnailSliderRef}
          className="slider-container w-full px-6  sm:w-full md:w-full xl:w-[63%] mx-auto"
        >
          {slider.map((val) => (
            <>
              <div className="border-l-4 h-20 border-[#e64833]">
                <a
                  href="#"
                  class="flex flex-col  mx-2  bg-white    shadow md:flex-row md:max-w-xl  "
                >
                  <img class=" h-20" src={val.img} alt={val.name} />
                  <div class="flex flex-col justify-between pl-2 leading-normal">
                    <p class="mb-3 font-normal text-black">
                    {truncateText(val.description, characterLimit)}
                    </p>
                  </div>
                </a>
              </div>
            </>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slidercursol;


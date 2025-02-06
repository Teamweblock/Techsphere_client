import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from "../../src/images/slider1.jpg";
import { MdAutoStories } from "react-icons/md";
import { useNavigate } from "react-router";
import { FaTachographDigital } from "react-icons/fa6";
import axios from "axios";
import { RiExchangeCnyFill } from "react-icons/ri";

const Home = () => {
  const getCharacterLimit = () => {
    return window.innerWidth > 1024 ? 40 : 30;
  };

  const navigate = useNavigate();
  const [characterLimit, setCharacterLimit] = useState(getCharacterLimit());
  const [mainSlider, setMainSlider] = useState(null);
  const [thumbnailSlider, setThumbnailSlider] = useState(null);
  const mainSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);
  const [category, setCategory] = useState([]);
  const [randomCategory, setRandomCategory] = useState([]);


  const BASE_URL = "http://localhost:5000";


  useEffect(() => {
    const randomcategory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/news/HomeCategorys`);
        console.log(response.data.randomCategories, "randomCategory");
        setRandomCategory(response.data.randomCategories);
      } catch (error) {
        console.error("Error fetching random category:", error);
      }
    };
    randomcategory();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/news/CategoryWisenews`
        );
        const data = response.data;
        console.log(response, "response");
        console.log(data, "data-----");
        // Filter data based on categoryName
        const latestStoriesData = data.categoryWiseNews.find(
          (item) => item.categoryName === "Latest Stories"
        );
        const insightsData = data.categoryWiseNews.find(
          (item) => item.categoryName === "Insight"
        );
        const changeMakersData = data.categoryWiseNews.find(
          (item) => item.categoryName === "Change Makers"
        );

        // Set state with filtered data
        setCategory(response.data.categoryWiseNews);
        setLatestStories(latestStoriesData);
        setInsights(insightsData);
        setChangeMakers(changeMakersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
  };

  const settings1 = {
    asNavFor: mainSlider,
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const settings2 = {
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

  const settings3 = {
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

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  //News Details
  const handlenavigate = (story) => {
    navigate(`/newsdetails/${story._id}`, { state: { story } });
  };

  //CategoryName navigate
  // const capitalizeCategoryName = (category) => {
  //   return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  // };
  const capitalizeCategoryName = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const handlenavigate1 = (
    category,
    categoryDescription = "Your default description."
  ) => {
    const formattedCategory = capitalizeCategoryName(category);
    navigate(`/category/${formattedCategory}`, {
      state: {
        categoryName: formattedCategory,
        categoryDescription: categoryDescription,
      },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //TagName navigate
  // const capitalizeTagName = (tag) => {
  //   return tag?.charAt(0).toUpperCase() + tag?.slice(1).toLowerCase();
  // };

  const handlenavigatetag = (tag) => {
    // const formattedTag = capitalizeTagName(tag);
    navigate(`/tag/${tag}`, {
      state: { tagName: tag },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className=" mt-32 justify-center items-center ">
        <div className=" w-full mx-auto ">
          <Slider
            {...settings}
            ref={mainSliderRef}
            className="slider-container "
          >
            {randomCategory.map((val) => (
              <div
                className="mx-auto animate-fade-in px-6 flex flex-col  justify-center items-center"
                key={val._id}
                data-aos="fade-up"
              >
                <img
                  src={val.image}
                  alt={val.category}
                  className="w-full h-full object-cover  mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-[400px] xl:w-[60%] xl:h-[400px]"
                />
                <p
                  onClick={() => handlenavigate(val)}
                  className="w-full text-black font-bold text-lg  mx-auto sm:w-full md:w-[60%] mt-4"
                >
                  {val.categoryContent || "Stories full of vigor and impact."}
                </p>
                <div className="w-full flex gap-4 items-center  mx-auto sm:w-full md:w-[60%] mt-4">
                  <button
                    onClick={(e) => {
                      handlenavigatetag(val.category);
                    }}
                    class="relative uppercase inline-flex items-center justify-center font-semibold text-lg  px-5 py-2  overflow-hidden  text-gray-900 rounded-lg group bg-gradient-to-br from-[#4360ac] to-[#2bace2] group-hover:from-[#2bace2] group-hover:to-blue-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                  >
                    {val.category || "NEWS"}
                  </button>
                  <button className="bg-transparent text-black font-semibold text-lg px-3 py-2">
                    By StartupStory
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="mt-10 w-full mx-auto sm:block hidden ">
          <Slider
            {...settings1}
            ref={thumbnailSliderRef}
            className="slider-container w-full px-6  sm:w-full md:w-full xl:w-[63%] mx-auto"
          >
            {randomCategory.map((val) => (
              <>
                <div className="border-l-4 h-20 border-[#4360ac]">
                  <div class="flex flex-col  mx-2  bg-white    shadow md:flex-row md:max-w-xl  ">
                    <img
                      class=" h-20 w-24"
                      src={val.image}
                      alt={val.category}
                    />
                    <div class="flex flex-col justify-between pl-2 leading-normal">
                      <p class="mb-3 font-normal text-black">
                        {truncateText(
                          val.categoryContent ||
                            "Stories full of vigor and impact.",
                          characterLimit
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </Slider>
        </div>
      </div>
      {category.map((item, index) => {
        return (
          <>
            {index === 0 ? (
              <div className="mt-20 overflow-hidden">
                <div className="bg-slate-100  h-96">
                  <div className="flex justify-between pt-5 w-full px-4  sm:w-full md:w-full xl:w-[78%] mx-auto">
                    <div className="flex gap-2">
                      <MdAutoStories className="h-14 w-14 text-[#4360ac]" />
                      <div>
                        <p className="font-bold text-lg sm:text-lg md:text-lg lg:text-2xl">
                          {item.categoryName}
                        </p>
                        <p className="font-medium text-xs sm:text-sm text-gray-600">
                          {/* <p className="font-medium text-xs sm:text-base md:text-base lg:text-lg xl:text-sm text-gray-600"> */}
                          Stories full of vigor and impact.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      // onClick={handlenavigate1}
                      onClick={() =>
                        handlenavigate1(
                          item.categoryName,
                          "Stories full of vigor and impact."
                        )
                      }
                      // to={item === "Home" ? "/" : `/category/${item}`}
                      class="py-2 px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border  dark:bg-white dark:text-black dark:border-[#4360ac] dark:hover:text-white dark:hover:bg-[#4360ac]"
                    >
                      View More
                    </button>
                  </div>
                </div>
                <div className="w-full mx-auto -mt-72 mb-20">
                  <Slider
                    {...settings2}
                    className="slider-container px-6  sm:w-full md:w-full grid space-y-7 justify-center xl:w-[93%] mx-auto"
                  >
                    {item?.news?.slice(0, 6).map((val) => (
                      <div
                        key={val.id}
                        onClick={() => handlenavigate(val)}
                        className="relative  sm:!w-[95%] md:!w-[95%] lg:!w-[314px] ml-1 xl:!w-[305px] 2xl:!w-[345px] grid justify-center mx-auto mt-5 mb-14 h-[350px] hover:ml-2 bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                      >
                        <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
                          <img
                            className="rounded-t-xl w-full h-[200px] object-cover"
                            src={val.heroimage}
                            alt={val.heading}
                          />
                        </a>
                        <div className="px-5 py-3">
                          <div className="flex justify-between items-center py-2">
                            <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
                              {new Date(val.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </h5>
                            <a
                              onClick={(e) => {
                                e.stopPropagation();
                                handlenavigatetag(val.title);
                              }}
                              className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white shadow hover:shadow-lg"
                            >
                              {/* {val.title} */}
                              {val.tagDetails.tag}
                            </a>
                          </div>
                          <p className=" font-medium text-black h-20 py-3">
                            {truncateText(val.summery, 50)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            ) : (
              <div className="w-full h-full  mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-full xl:w-[70%] xl:h-[50%]">
                <div className="flex justify-between pt-10 w-full px-4  sm:w-full md:w-full xl:w-[90%] mx-auto">
                  <div className="flex gap-2">
                    <FaTachographDigital className="h-14 w-14 text-[#4360ac]" />
                    <div>
                      <p className="font-bold text-lg sm:text-lg md:text-lg lg:text-2xl">
                        {item.categoryName}
                      </p>
                      <p className="font-medium text-xs sm:text-sm text-gray-600">
                        Digging deeper in the accuracy
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handlenavigate1(
                        item.categoryName,
                        "Digging deeper in the accuracy"
                      )
                    }
                    class=" px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border  dark:bg-white dark:text-black dark:border-[#4360ac] dark:hover:text-white dark:hover:bg-[#4360ac]"
                  >
                    View More
                  </button>
                </div>
                <div className="slider-container px-6 sm:w-full hidden lg:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 justify-between md:w-full xl:w-[90%] mx-auto">
                  {item?.news?.slice(0, 4).map((val) => (
                    <div
                      key={val._id}
                      onClick={() => handlenavigate(val)}
                      className="relative grid justify-center col-span-1 mx-auto m-5 h-[370px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                    >
                      <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
                        <img
                          className="rounded-t-xl w-full h-fit object-cover"
                          src={val.heroimage}
                          alt={val.heading}
                        />
                      </a>
                      <div className="px-5 space-y-5">
                        {/* <div className="flex justify-between items-center py-2"> */}
                        <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
                          {/* {val.date} */}
                          {new Date(val.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </h5>

                        {/* </div> */}
                        <p className="mb-3 font-medium text-black ">
                          {truncateText(val.summery, 45)}
                        </p>
                        <a
                          onClick={(e) => {
                            e.stopPropagation();
                            handlenavigatetag(val.btn);
                          }}
                          className="inline-flex uppercase relative items-center cursor-pointer px-2  text-xs font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-[#4360ac] hover:text-white shadow hover:shadow-lg"
                        >
                          {val.title}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="block lg:hidden">
                  <Slider
                    {...settings3}
                    className="slider-container px-6 sm:w-full md:w-full grid justify-center xl:w-[90%] mx-auto overflow-hidden"
                  >
                    {item?.news?.slice(0, 4).map((val) => (
                      <div
                        key={val.id}
                        onClick={() => handlenavigate(val)}
                        className="relative sm:!w-[95%] md:!w-[95%] lg:!w-[314px] xl:!w-[305px] 2xl:!w-[345px] grid justify-center mx-auto m-5 h-[380px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                      >
                        <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
                          <img
                            className="rounded-t-xl w-full h-[200px] object-cover"
                            src={val.heroimage}
                            alt={val.heading}
                          />
                        </a>
                        <div className="p-5 space-y-3">
                          {/* <div className="flex justify-between items-center py-2"> */}
                          <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
                            {new Date(val.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </h5>

                          {/* </div> */}
                          <p className=" font-medium text-black ">
                            {truncateText(val.summery, 45)}
                          </p>
                          <a
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents triggering handlenavigate when button is clicked
                              handlenavigatetag(val.btn);
                            }}
                            className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-[#4360ac] hover:text-white shadow hover:shadow-lg"
                          >
                            {val.title}
                          </a>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            )}
          </>
        );
      })}

      {/* <div className="w-full h-full  mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-full xl:w-[70%] xl:h-[50%]">
        <div className="flex justify-between pt-10 w-full px-4  sm:w-full md:w-full xl:w-[90%] mx-auto">
          <div className="flex gap-2">
            <RiExchangeCnyFill className="h-14 w-14 text-[#4360ac]" />
            <div>
              <p className="font-bold text-lg sm:text-lg md:text-lg lg:text-2xl">
              Change Makers
              </p>
              <p className="font-medium text-xs sm:text-sm text-gray-600">
              Vaccine Development
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              handlenavigate1("Change Makers", "Vaccine Development")
            }
            class=" px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border  dark:bg-white dark:text-black dark:border-[#4360ac] dark:hover:text-white dark:hover:bg-[#4360ac]"
          >
            View More
          </button>
        </div>
        <div className="slider-container px-6 sm:w-full hidden lg:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 justify-between md:w-full xl:w-[90%] mx-auto">
          {changeMakers?.news?.slice(0, 4).map((val) => (
            <div
              key={val.id}
              onClick={() => handlenavigate(val)}
              className="relative grid justify-center col-span-1 mx-auto m-5 h-[370px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
            >
              <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
                <img
                  className="rounded-t-xl w-full h-fit object-cover"
                  src={val.heroimage}
                  alt={val.heading}
                />
              </a>
              <div className="px-5 space-y-5">
              
                  <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
              
                    {new Date(val.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h5>
                  
          
                <p className="mb-3 font-medium text-black ">
                  {truncateText(val.summery, 45)}
                </p>
                <a
                    onClick={(e) => {
                      e.stopPropagation();
                      handlenavigatetag(val.btn);
                    }}
                    className="inline-flex uppercase relative items-center cursor-pointer px-2  text-xs font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-[#4360ac] hover:text-white shadow hover:shadow-lg"
                  >
                    {val.title}
                  </a>
              </div>
            </div>
          ))}
        </div>
        <div className="block lg:hidden">
          <Slider
            {...settings3}
            className="slider-container px-6 sm:w-full md:w-full grid justify-center xl:w-[90%] mx-auto overflow-hidden"
          >
            {changeMakers?.news?.slice(0, 4).map((val) => (
              <div
                key={val.id}
                onClick={() => handlenavigate(val)}
                className="relative sm:!w-[95%] md:!w-[95%] lg:!w-[314px] xl:!w-[305px] 2xl:!w-[345px] grid justify-center mx-auto m-5 h-[380px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              >
                <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
                  <img
                    className="rounded-t-xl w-full h-[200px] object-cover"
                    src={val.heroimage}
                    alt={val.heading}
                  />
                </a>
                <div className="p-5 space-y-3">
                  
                    <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
                    {new Date(val.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    </h5>
                   
                 
                  <p className=" font-medium text-black ">
                    {truncateText(val.summery, 45)}
                  </p>
                  <a
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handlenavigatetag(val.title);
                      }}
                      className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-[#4360ac] hover:text-white shadow hover:shadow-lg"
                    >
                      {val.title}
                    </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        
      </div> */}
    </>
  );
};

export default Home;

// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import slider1 from "../../src/images/slider1.jpg";
// import { MdAutoStories } from "react-icons/md";
// import { useNavigate } from "react-router";
// import { FaTachographDigital } from "react-icons/fa6";
// import axios from "axios";
// import { RiExchangeCnyFill } from "react-icons/ri";

// const Home = () => {
//   const getCharacterLimit = () => {
//     return window.innerWidth > 1024 ? 40 : 30;
//   };

//   const navigate = useNavigate();
//   const [characterLimit, setCharacterLimit] = useState(getCharacterLimit());
//   const [mainSlider, setMainSlider] = useState(null);
//   const [thumbnailSlider, setThumbnailSlider] = useState(null);
//   const mainSliderRef = useRef(null);
//   const thumbnailSliderRef = useRef(null);

//   const [latestStories, setLatestStories] = useState({ news: [] });
//   const [insights, setInsights] = useState({ news: [] });
//   const [changeMakers, setChangeMakers] = useState([]);
//   console.log(latestStories, "latestStories");
//   console.log(insights, "insights");
//   // Fetch data from API

//   const[randomCategory, setRandomCategory] = useState([])
//  const BASE_URL = "http://localhost:5000"
//   useEffect (() => {

//     const randomcategory = async() => {
//       try{
//         const response = await axios.get(`${BASE_URL}/news/HomeCategorys`)
//         console.log(response.data.randomCategories, "randomCategory");
//         setRandomCategory(response.data.randomCategories
//         )
//       } catch (error) {
//         console.error("Error fetching random category:", error);
//       }
//     }
//     randomcategory();
//   },[])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/news/CategoryWisenews"
//         );
//         const data = response.data;
//         console.log(response, "response");
//         console.log(data, "data-----");
//         // Filter data based on categoryName
//         const latestStoriesData = data.categoryWiseNews.find(
//           (item) => item.categoryName === "Latest Stories"
//         );
//         const insightsData = data.categoryWiseNews.find(
//           (item) => item.categoryName === "Insight"
//         );
//         const changeMakersData = data.categoryWiseNews.find(
//           (item) => item.categoryName === "Change Makers"
//         );

//         // Set state with filtered data
//         setLatestStories(latestStoriesData);
//         setInsights(insightsData);
//         setChangeMakers(changeMakersData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     setMainSlider(mainSliderRef.current);
//     setThumbnailSlider(thumbnailSliderRef.current);

//     const handleResize = () => {
//       setCharacterLimit(getCharacterLimit());
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const settings = {
//     asNavFor: thumbnailSlider,
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     pauseOnHover: true,
//     arrows: false,
//   };

//   const settings1 = {
//     asNavFor: mainSlider,
//     slidesToShow: 3,
//     swipeToSlide: true,
//     focusOnSelect: true,
//     infinite: true,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   const settings2 = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: false,
//     responsive: [
//       {
//         breakpoint: 1030,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const settings3 = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: false,
//     responsive: [
//       {
//         breakpoint: 1030,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const truncateText = (text, maxLength) => {
//     return text?.length > maxLength
//       ? text.substring(0, maxLength) + "..."
//       : text;
//   };

//   //News Details
//   const handlenavigate = (story) => {
//     navigate(`/newsdetails/${story._id}`, { state: { story } });
//   };

//   //CategoryName navigate
//   // const capitalizeCategoryName = (category) => {
//   //   return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
//   // };
//   const capitalizeCategoryName = (category) => {
//     return category
//       .split(" ")
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };
//   const handlenavigate1 = (
//     category,
//     categoryDescription = "Your default description."
//   ) => {
//     const formattedCategory = capitalizeCategoryName(category);
//     navigate(`/category/${formattedCategory}`, {
//       state: {
//         categoryName: formattedCategory,
//         categoryDescription: categoryDescription,
//       },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   //TagName navigate
//   // const capitalizeTagName = (tag) => {
//   //   return tag?.charAt(0).toUpperCase() + tag?.slice(1).toLowerCase();
//   // };

//   const handlenavigatetag = (tag) => {
//     // const formattedTag = capitalizeTagName(tag);
//     navigate(`/tag/${tag}`, {
//       state: { tagName: tag },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <div className=" mt-32 justify-center items-center ">
//         <div className=" w-full mx-auto ">
//           <Slider
//             {...settings}
//             ref={mainSliderRef}
//             className="slider-container "
//           >
//             {randomCategory.map((val) => (
//               <div
//                 className="mx-auto animate-fade-in px-6 flex flex-col  justify-center items-center"
//                 key={val._id}
//                 data-aos="fade-up"
//               >
//                 <img
//                   src={val.image}
//                   alt={val.category}
//                   className="w-full h-full object-cover  mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-[400px] xl:w-[60%] xl:h-[400px]"
//                 />
//                 <p
//                   onClick={() => handlenavigate(val)}
//                   className="w-full text-black font-bold text-lg  mx-auto sm:w-full md:w-[60%] mt-4"
//                 >
//                   {val.categoryContent || "Stories full of vigor and impact."}
//                 </p>
//                 <div className="w-full flex gap-4 items-center  mx-auto sm:w-full md:w-[60%] mt-4">
//                   <button
//                     onClick={(e) => {
//                       handlenavigatetag(val.category);
//                     }}
//                     class="relative uppercase inline-flex items-center justify-center font-semibold text-lg  px-5 py-2  overflow-hidden  text-gray-900 rounded-lg group bg-gradient-to-br from-[#4360ac] to-[#2bace2] group-hover:from-[#2bace2] group-hover:to-blue-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
//                   >
//                     {val.category || "NEWS"}
//                   </button>
//                   <button className="bg-transparent text-black font-semibold text-lg px-3 py-2">
//                     By StartupStory
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//         <div className="mt-10 w-full mx-auto sm:block hidden ">
//           <Slider
//             {...settings1}
//             ref={thumbnailSliderRef}
//             className="slider-container w-full px-6  sm:w-full md:w-full xl:w-[63%] mx-auto"
//           >
//             {randomCategory.map((val) => (
//               <>
//                 <div className="border-l-4 h-20 border-[#4360ac]">
//                   <div class="flex flex-col  mx-2  bg-white    shadow md:flex-row md:max-w-xl  ">
//                     <img class=" h-20 w-24" src={val.image} alt={val.category} />
//                     <div class="flex flex-col justify-between pl-2 leading-normal">
//                       <p class="mb-3 font-normal text-black">
//                         {truncateText(val.categoryContent || "Stories full of vigor and impact.", characterLimit)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ))}
//           </Slider>
//         </div>
//       </div>
//       <div className="mt-20 overflow-hidden">
//         <div className="bg-slate-100  h-96">
//           <div className="flex justify-between pt-5 w-full px-4  sm:w-full md:w-full xl:w-[78%] mx-auto">
//             <div className="flex gap-2">
//               <MdAutoStories className="h-14 w-14 text-[#4360ac]" />
//               <div>
//                 <p className="font-bold text-lg sm:text-lg md:text-lg lg:text-2xl">
//                   Latest stories
//                 </p>
//                 <p className="font-medium text-xs sm:text-sm text-gray-600">
//                   {/* <p className="font-medium text-xs sm:text-base md:text-base lg:text-lg xl:text-sm text-gray-600"> */}
//                   Stories full of vigor and impact.
//                 </p>
//               </div>
//             </div>
//             <button
//               type="button"
//               // onClick={handlenavigate1}
//               onClick={() =>
//                 handlenavigate1("Stories", "Stories full of vigor and impact.")
//               }
//               // to={item === "Home" ? "/" : `/category/${item}`}
//               class="py-2 px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border  dark:bg-white dark:text-black dark:border-[#4360ac] dark:hover:text-white dark:hover:bg-[#4360ac]"
//             >
//               View More
//             </button>
//           </div>
//         </div>
//         <div className="w-full mx-auto -mt-72 mb-20">
//           <Slider
//             {...settings2}
//             className="slider-container px-6  sm:w-full md:w-full grid space-y-7 justify-center xl:w-[93%] mx-auto"
//           >
//             {latestStories?.news?.map((val) => (
//               <div
//                 key={val.id}
//                 onClick={() => handlenavigate(val)}
//                 className="relative  sm:!w-[95%] md:!w-[95%] lg:!w-[314px] ml-1 xl:!w-[305px] 2xl:!w-[345px] grid justify-center mx-auto mt-5 mb-14 h-[350px] hover:ml-2 bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//               >
//                 <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                   <img
//                     className="rounded-t-xl w-full h-[200px] object-cover"
//                     src={val.heroimage}
//                     alt={val.heading}
//                   />
//                 </a>
//                 <div className="px-5 py-3">
//                   <div className="flex justify-between items-center py-2">
//                     <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                       {new Date(val.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                     </h5>
//                     <a
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handlenavigatetag(val.title);
//                       }}
//                       className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white shadow hover:shadow-lg"
//                     >
//                       {/* {val.title} */}
//                       {val.tagDetails.tag}
//                     </a>
//                   </div>
//                   <p className=" font-medium text-black h-20 py-3">
//                     {truncateText(val.summery, 50)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//       <div className="w-full h-full  mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-full xl:w-[70%] xl:h-[50%]">
//         <div className="flex justify-between pt-10 w-full px-4  sm:w-full md:w-full xl:w-[90%] mx-auto">
//           <div className="flex gap-2">
//             <FaTachographDigital className="h-14 w-14 text-[#4360ac]" />
//             <div>
//               <p className="font-bold text-lg sm:text-lg md:text-lg lg:text-2xl">
//                 Insights
//               </p>
//               <p className="font-medium text-xs sm:text-sm text-gray-600">
//                 Digging deeper in the accuracy
//               </p>
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={() =>
//               handlenavigate1("Insights", "Digging deeper in the accuracy")
//             }
//             class=" px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border  dark:bg-white dark:text-black dark:border-[#4360ac] dark:hover:text-white dark:hover:bg-[#4360ac]"
//           >
//             View More
//           </button>
//         </div>
//         <div className="slider-container px-6 sm:w-full hidden lg:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 justify-between md:w-full xl:w-[90%] mx-auto">
//           {insights?.news?.slice(0, 4).map((val) => (
//             <div
//               key={val.id}
//               onClick={() => handlenavigate(val)}
//               className="relative grid justify-center col-span-1 mx-auto m-5 h-[370px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//             >
//               <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                 <img
//                   className="rounded-t-xl w-full h-fit object-cover"
//                   src={val.heroimage}
//                   alt={val.heading}
//                 />
//               </a>
//               <div className="px-5 space-y-5">
//                 {/* <div className="flex justify-between items-center py-2"> */}
//                   <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                     {/* {val.date} */}
//                     {new Date(val.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </h5>

//                 {/* </div> */}
//                 <p className="mb-3 font-medium text-black ">
//                   {truncateText(val.summery, 45)}
//                 </p>
//                 <a
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handlenavigatetag(val.btn);
//                     }}
//                     className="inline-flex uppercase relative items-center cursor-pointer px-2  text-xs font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-[#4360ac] hover:text-white shadow hover:shadow-lg"
//                   >
//                     {val.title}
//                   </a>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="block lg:hidden">
//           <Slider
//             {...settings3}
//             className="slider-container px-6 sm:w-full md:w-full grid justify-center xl:w-[90%] mx-auto overflow-hidden"
//           >
//             {insights?.news?.slice(0, 4).map((val) => (
//               <div
//                 key={val.id}
//                 onClick={() => handlenavigate(val)}
//                 className="relative sm:!w-[95%] md:!w-[95%] lg:!w-[314px] xl:!w-[305px] 2xl:!w-[345px] grid justify-center mx-auto m-5 h-[380px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//               >
//                 <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                   <img
//                     className="rounded-t-xl w-full h-[200px] object-cover"
//                     src={val.heroimage}
//                     alt={val.heading}
//                   />
//                 </a>
//                 <div className="p-5 space-y-3">
//                   {/* <div className="flex justify-between items-center py-2"> */}
//                     <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                     {new Date(val.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                     </h5>

//                   {/* </div> */}
//                   <p className=" font-medium text-black ">
//                     {truncateText(val.summery, 45)}
//                   </p>
//                   <a
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevents triggering handlenavigate when button is clicked
//                         handlenavigatetag(val.btn);
//                       }}
//                       className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-[#4360ac] hover:text-white shadow hover:shadow-lg"
//                     >
//                       {val.title}
//                     </a>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>

//       </div>
//       <div className="w-full h-full  mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-full xl:w-[70%] xl:h-[50%]">
//         <div className="flex justify-between pt-10 w-full px-4  sm:w-full md:w-full xl:w-[90%] mx-auto">
//           <div className="flex gap-2">
//             <RiExchangeCnyFill className="h-14 w-14 text-[#4360ac]" />
//             <div>
//               <p className="font-bold text-lg sm:text-lg md:text-lg lg:text-2xl">
//               Change Makers
//               </p>
//               <p className="font-medium text-xs sm:text-sm text-gray-600">
//               Vaccine Development
//               </p>
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={() =>
//               handlenavigate1("Change Makers", "Vaccine Development")
//             }
//             class=" px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border  dark:bg-white dark:text-black dark:border-[#4360ac] dark:hover:text-white dark:hover:bg-[#4360ac]"
//           >
//             View More
//           </button>
//         </div>
//         <div className="slider-container px-6 sm:w-full hidden lg:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 justify-between md:w-full xl:w-[90%] mx-auto">
//           {changeMakers?.news?.slice(0, 4).map((val) => (
//             <div
//               key={val.id}
//               onClick={() => handlenavigate(val)}
//               className="relative grid justify-center col-span-1 mx-auto m-5 h-[370px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//             >
//               <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                 <img
//                   className="rounded-t-xl w-full h-fit object-cover"
//                   src={val.heroimage}
//                   alt={val.heading}
//                 />
//               </a>
//               <div className="px-5 space-y-5">
//                 {/* <div className="flex justify-between items-center py-2"> */}
//                   <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                     {/* {val.date} */}
//                     {new Date(val.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </h5>

//                 {/* </div> */}
//                 <p className="mb-3 font-medium text-black ">
//                   {truncateText(val.summery, 45)}
//                 </p>
//                 <a
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handlenavigatetag(val.btn);
//                     }}
//                     className="inline-flex uppercase relative items-center cursor-pointer px-2  text-xs font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-[#4360ac] hover:text-white shadow hover:shadow-lg"
//                   >
//                     {val.title}
//                   </a>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="block lg:hidden">
//           <Slider
//             {...settings3}
//             className="slider-container px-6 sm:w-full md:w-full grid justify-center xl:w-[90%] mx-auto overflow-hidden"
//           >
//             {changeMakers?.news?.slice(0, 4).map((val) => (
//               <div
//                 key={val.id}
//                 onClick={() => handlenavigate(val)}
//                 className="relative sm:!w-[95%] md:!w-[95%] lg:!w-[314px] xl:!w-[305px] 2xl:!w-[345px] grid justify-center mx-auto m-5 h-[380px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//               >
//                 <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                   <img
//                     className="rounded-t-xl w-full h-[200px] object-cover"
//                     src={val.heroimage}
//                     alt={val.heading}
//                   />
//                 </a>
//                 <div className="p-5 space-y-3">
//                   {/* <div className="flex justify-between items-center py-2"> */}
//                     <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                     {new Date(val.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                     </h5>

//                   {/* </div> */}
//                   <p className=" font-medium text-black ">
//                     {truncateText(val.summery, 45)}
//                   </p>
//                   <a
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevents triggering handlenavigate when button is clicked
//                         handlenavigatetag(val.title);
//                       }}
//                       className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-[#4360ac] hover:text-white shadow hover:shadow-lg"
//                     >
//                       {val.title}
//                     </a>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>

//       </div>
//     </>
//   );
// };

// export default Home;

// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import slider1 from "../../src/images/slider1.jpg";
// import { MdAutoStories } from "react-icons/md";
// import { useNavigate } from "react-router";
// import { FaTachographDigital } from "react-icons/fa6";
// import axios from "axios"; // Import axios for API calls

// const Home = () => {
//   const getCharacterLimit = () => {
//     return window.innerWidth > 1024 ? 50 : 30;
//   };

//   const navigate = useNavigate();
//   const [characterLimit, setCharacterLimit] = useState(getCharacterLimit());
//   const [mainSlider, setMainSlider] = useState(null);
//   const [thumbnailSlider, setThumbnailSlider] = useState(null);
//   const mainSliderRef = useRef(null);
//   const thumbnailSliderRef = useRef(null);

//   // State for fetched data
//   const [latestStories, setLatestStories] = useState([]);
//   const [insights, setInsights] = useState([]);

//   // Fetch data from API
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/news/CategoryWisenews"
//       );
//       const data = response.data;

//       // Assuming the API returns an object with `latestStories` and `insights` keys
//       if (data.latestStories) {
//         setLatestStories(data.latestStories);
//       }
//       if (data.insights) {
//         setInsights(data.insights);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   fetchData();
// }, []);

//   useEffect(() => {
//     setMainSlider(mainSliderRef.current);
//     setThumbnailSlider(thumbnailSliderRef.current);

//     const handleResize = () => {
//       setCharacterLimit(getCharacterLimit());
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const settings = {
//     asNavFor: thumbnailSlider,
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     pauseOnHover: true,
//     arrows: false,
//   };

//   const settings1 = {
//     asNavFor: mainSlider,
//     slidesToShow: 3,
//     swipeToSlide: true,
//     focusOnSelect: true,
//     infinite: true,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   const settings2 = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: false,
//     responsive: [
//       {
//         breakpoint: 1030,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const settings3 = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: false,
//     responsive: [
//       {
//         breakpoint: 1030,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const truncateText = (text, maxLength) => {
//     return text.length > maxLength
//       ? text.substring(0, maxLength) + "..."
//       : text;
//   };

//   // News Details
//   const handlenavigate = (story) => {
//     navigate(`/newsdetails/${story.id}`, { state: { story } });
//   };

//   // CategoryName navigate
//   const capitalizeCategoryName = (category) => {
//     return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
//   };

//   const handlenavigate1 = (category, categoryDescription = "Your default description.") => {
//     const formattedCategory = capitalizeCategoryName(category);
//     navigate(`/category/${formattedCategory}`, {
//       state: {
//         categoryName: formattedCategory,
//         categoryDescription: categoryDescription,
//       },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // TagName navigate
//   const capitalizeTagName = (tag) => {
//     return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
//   };

//   const handlenavigatetag = (tag) => {
//     const formattedTag = capitalizeTagName(tag);
//     navigate(`/tag/${formattedTag}`, {
//       state: { tagName: formattedTag },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <div className="mt-32 justify-center items-center">
//         <div className="w-full mx-auto">
//           <Slider
//             {...settings}
//             ref={mainSliderRef}
//             className="slider-container"
//           >
//             {latestStories.map((val) => (
//               <div
//                 className="mx-auto animate-fade-in px-6 flex flex-col justify-center items-center"
//                 key={val.id}
//                 data-aos="fade-up"
//               >
//                 <img
//                   src={val.img}
//                   alt={val.name}
//                   className="w-full h-full object-cover mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-[400px] xl:w-[60%] xl:h-[400px]"
//                 />
//                 <p
//                   onClick={() => handlenavigate(val)}
//                   className="w-full text-black font-bold text-lg mx-auto sm:w-full md:w-[60%] mt-4"
//                 >
//                   {val.description}
//                 </p>
//                 <div className="w-full flex gap-4 items-center mx-auto sm:w-full md:w-[60%] mt-4">
//                   <button
//                     onClick={(e) => {
//                       handlenavigatetag(val.btn);
//                     }}
//                     className="relative uppercase inline-flex items-center justify-center font-semibold text-lg px-5 py-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-red-900 to-[#e64833] group-hover:from-[#e64833] group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
//                   >
//                     {val.btn}
//                   </button>
//                   <button className="bg-transparent text-black font-semibold text-lg px-3 py-2">
//                     By StartupStory
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//         <div className="mt-10 w-full mx-auto sm:block hidden">
//           <Slider
//             {...settings1}
//             ref={thumbnailSliderRef}
//             className="slider-container w-full px-6 sm:w-full md:w-full xl:w-[63%] mx-auto"
//           >
//             {latestStories.map((val) => (
//               <div className="border-l-4 h-20 border-[#e64833]" key={val.id}>
//                 <div className="flex flex-col mx-2 bg-white shadow md:flex-row md:max-w-xl">
//                   <img className="h-20" src={val.img} alt={val.name} />
//                   <div className="flex flex-col justify-between pl-2 leading-normal">
//                     <p className="mb-3 font-normal text-black">
//                       {truncateText(val.description, characterLimit)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//       <div className="mt-20 overflow-hidden">
//         <div className="bg-slate-100 h-96">
//           <div className="flex justify-between pt-5 w-full px-4 sm:w-full md:w-full xl:w-[78%] mx-auto">
//             <div className="flex gap-2">
//               <MdAutoStories className="h-14 w-14 text-[#e64833]" />
//               <div>
//                 <p className="font-bold text-lg sm:text-lg md:text-lg lg:text-2xl">
//                   Latest stories
//                 </p>
//                 <p className="font-medium text-xs sm:text-sm text-gray-600">
//                   Stories full of vigor and impact.
//                 </p>
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={() =>
//                 handlenavigate1("Stories", "Stories full of vigor and impact.")
//               }
//               className="py-2 px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border dark:bg-white dark:text-black dark:border-[#e64833] dark:hover:text-white dark:hover:bg-[#e64833]"
//             >
//               View More
//             </button>
//           </div>
//         </div>
//         <div className="w-full mx-auto -mt-72 mb-20">
//           <Slider
//             {...settings2}
//             className="slider-container px-6 sm:w-full md:w-full grid space-y-7 justify-center xl:w-[93%] mx-auto"
//           >
//             {latestStories.map((val) => (
//               <div
//                 key={val.id}
//                 onClick={() => handlenavigate(val)}
//                 className="relative sm:!w-[95%] md:!w-[95%] lg:!w-[314px] ml-1 xl:!w-[305px] 2xl:!w-[345px] grid justify-center mx-auto mt-5 mb-14 h-[350px] hover:ml-2 bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//               >
//                 <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                   <img
//                     className="rounded-t-xl w-full h-[200px] object-cover"
//                     src={val.img}
//                     alt={val.name}
//                   />
//                 </a>
//                 <div className="px-5 py-3">
//                   <div className="flex justify-between items-center py-2">
//                     <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                       {val.date}
//                     </h5>
//                     <a
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handlenavigatetag(val.btn);
//                       }}
//                       className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-red-500 bg-red-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
//                     >
//                       {val.btn}
//                     </a>
//                   </div>
//                   <p className="font-medium text-black h-20 py-3">
//                     {truncateText(val.description, 50)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//       <div className="w-full h-full mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-full xl:w-[70%] xl:h-[50%]">
//         <div className="flex justify-between pt-10 w-full px-4 sm:w-full md:w-full xl:w-[90%] mx-auto">
//           <div className="flex gap-2">
//             <FaTachographDigital className="h-14 w-14 text-[#e64833]" />
//             <div>
//               <p className="font-bold text-lg sm:text-lg md:text-lg lg:text-2xl">
//                 Insights
//               </p>
//               <p className="font-medium text-xs sm:text-sm text-gray-600">
//                 Digging deeper in the accuracy
//               </p>
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={() =>
//               handlenavigate1("Insights", "Digging deeper in the accuracy")
//             }
//             className="px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border dark:bg-white dark:text-black dark:border-[#e64833] dark:hover:text-white dark:hover:bg-[#e64833]"
//           >
//             View More
//           </button>
//         </div>
//         <div className="slider-container px-6 sm:w-full hidden lg:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 justify-between md:w-full xl:w-[90%] mx-auto">
//           {insights.map((val) => (
//             <div
//               key={val.id}
//               onClick={() => handlenavigate(val)}
//               className="relative grid justify-center col-span-1 mx-auto m-5 h-[370px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//             >
//               <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                 <img
//                   className="rounded-t-xl w-full h-fit object-cover"
//                   src={val.img}
//                   alt={val.name}
//                 />
//               </a>
//               <div className="px-5 space-y-5">
//                 <div className="flex justify-between items-center py-2">
//                   <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                     {val.date}
//                   </h5>
//                   <a
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handlenavigatetag(val.btn);
//                     }}
//                     className="inline-flex uppercase relative items-center cursor-pointer px-2 text-xs font-medium text-red-500 bg-red-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
//                   >
//                     {val.btn}
//                   </a>
//                 </div>
//                 <p className="mb-3 font-medium text-black">
//                   {truncateText(val.description, 45)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="block lg:hidden">
//           <Slider
//             {...settings3}
//             className="slider-container px-6 sm:w-full md:w-full grid justify-center xl:w-[90%] mx-auto overflow-hidden"
//           >
//             {insights.map((val) => (
//               <div
//                 key={val.id}
//                 onClick={() => handlenavigate(val)}
//                 className="relative sm:!w-[95%] md:!w-[95%] lg:!w-[314px] xl:!w-[305px] 2xl:!w-[345px] grid justify-center mx-auto m-5 h-[380px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//               >
//                 <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                   <img
//                     className="rounded-t-xl w-full h-[200px] object-cover"
//                     src={val.img}
//                     alt={val.name}
//                   />
//                 </a>
//                 <div className="p-5 space-y-3">
//                   <div className="flex justify-between items-center py-2">
//                     <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                       {val.date}
//                     </h5>
//                     <a
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handlenavigatetag(val.btn);
//                       }}
//                       className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-red-500 bg-red-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
//                     >
//                       {val.btn}
//                     </a>
//                   </div>
//                   <p className="font-medium text-black">
//                     {truncateText(val.description, 45)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import slider1 from "../../src/images/slider1.jpg";
// import { MdAutoStories } from "react-icons/md";
// import { useNavigate } from "react-router";
// import { FaTachographDigital } from "react-icons/fa6";

// const slider = [
//   {
//     id: 1,
//     img: slider1,
//     name: "Meylitha",
//     date: "May 2, 2023",
//     description: "QuiD Cash Raises $4.5 Million in Pre-Series A Funding",
//     btn: "Startups",
//   },
//   {
//     id: 2,
//     img: slider1,
//     name: "Jackson",
//     date: "May 2, 2023",
//     description:
//       "How This Founder Turned ₹18 Lakhs into ₹8 Crore in Revenue The Océglōw Success Story",
//     btn: "News",
//   },
//   {
//     id: 3,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description: "From Jaipur to the World",
//     btn: "Insights",
//   },
//   {
//     id: 4,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Funding Alerts",
//   },
//   {
//     id: 5,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " Jaipur to the World: The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Paris",
//   },
//   {
//     id: 6,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " to the World: The Story of Zuvelio  Redefining Jewelry with Innovation and Sustainability",
//     btn: "Funding Alerts",
//   },
// ];

// const slider2 = [
//   {
//     id: 1,
//     img: slider1,
//     name: "Meylitha",
//     date: "May 2, 2023",
//     description: "QuiD Cash Raises $4.5 Million in Pre-Series A Funding",
//     btn: "Insights",
//   },
//   {
//     id: 2,
//     img: slider1,
//     name: "Jackson",
//     date: "May 2, 2023",
//     description:
//       "How This Founder Turned ₹18 Lakhs into ₹8 Crore in Revenue The Océglōw Success Story",
//     btn: "Insights",
//   },
//   {
//     id: 3,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       "Zuvelio Redefining Jewelry with Innovation and Sustainability   ",
//     btn: "Insights",
//   },
//   {
//     id: 4,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups"
//   },
// ];

// const Home = () => {
//   const getCharacterLimit = () => {
//     return window.innerWidth > 1024 ? 50 : 30;
//   };

//   const navigate = useNavigate();
//   const [characterLimit, setCharacterLimit] = useState(getCharacterLimit());
//   const [mainSlider, setMainSlider] = useState(null);
//   const [thumbnailSlider, setThumbnailSlider] = useState(null);
//   const mainSliderRef = useRef(null);
//   const thumbnailSliderRef = useRef(null);

//   useEffect(() => {
//     setMainSlider(mainSliderRef.current);
//     setThumbnailSlider(thumbnailSliderRef.current);

//     const handleResize = () => {
//       setCharacterLimit(getCharacterLimit());
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const settings = {
//     asNavFor: thumbnailSlider,
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     pauseOnHover: true,
//     arrows: false,
//   };

//   const settings1 = {
//     asNavFor: mainSlider,
//     slidesToShow: 3,
//     swipeToSlide: true,
//     focusOnSelect: true,
//     infinite: true,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   const settings2 = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: false,
//     responsive: [
//       {
//         breakpoint: 1030,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const settings3 = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: false,
//     responsive: [
//       {
//         breakpoint: 1030,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const truncateText = (text, maxLength) => {
//     return text.length > maxLength
//       ? text.substring(0, maxLength) + "..."
//       : text;
//   };

// //News Details
//   const handlenavigate = (story) => {
//     navigate(`/newsdetails/${story.id}`, { state: { story } });
//   };

//   //CategoryName navigate
//   const capitalizeCategoryName = (category) => {
//     return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
//   };

//   const handlenavigate1 = (category , categoryDescription = "Your default description.") => {
//     const formattedCategory = capitalizeCategoryName(category);
//     navigate(`/category/${formattedCategory}`, {
//       state: {
//         categoryName: formattedCategory,
//         categoryDescription: categoryDescription,
//       },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   //TagName navigate
//   const capitalizeTagName = (tag) => {
//     return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
//   };

//   const handlenavigatetag = (tag) => {
//     const formattedTag = capitalizeTagName(tag);
//     navigate(`/tag/${formattedTag}`, {
//       state: { tagName: formattedTag },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <div className=" mt-32 justify-center items-center ">
//         <div className=" w-full mx-auto ">
//           <Slider
//             {...settings}
//             ref={mainSliderRef}
//             className="slider-container "
//           >
//             {slider.map((val) => (
//               <div
//                 className="mx-auto animate-fade-in px-6 flex flex-col  justify-center items-center"
//                 key={val.id}
//                 data-aos="fade-up"
//               >
//                 <img
//                   src={val.img}
//                   alt={val.name}
//                   className="w-full h-full object-cover  mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-[400px] xl:w-[60%] xl:h-[400px]"
//                   // className="w-[60%] h-[50%] mx-auto rounded-2xl" // Adjusted size for responsiveness
//                 />
//                 <p
//                   onClick={() => handlenavigate(val)}
//                   className="w-full text-black font-bold text-lg  mx-auto sm:w-full md:w-[60%] mt-4"
//                 >
//                   {val.description}
//                 </p>
//                 <div className="w-full flex gap-4 items-center  mx-auto sm:w-full md:w-[60%] mt-4">
//                   <button
//                     onClick={(e) => {
//                       handlenavigatetag(val.btn);
//                     }}
//                     class="relative uppercase inline-flex items-center justify-center font-semibold text-lg  px-5 py-2  overflow-hidden  text-gray-900 rounded-lg group bg-gradient-to-br from-red-900 to-[#e64833] group-hover:from-[#e64833] group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
//                   >
//                     {val.btn}
//                   </button>
//                   <button className="bg-transparent text-black font-semibold text-lg px-3 py-2">
//                     By StartupStory
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//         <div className="mt-10 w-full mx-auto sm:block hidden ">
//           <Slider
//             {...settings1}
//             ref={thumbnailSliderRef}
//             className="slider-container w-full px-6  sm:w-full md:w-full xl:w-[63%] mx-auto"
//           >
//             {slider.map((val) => (
//               <>
//                 <div className="border-l-4 h-20 border-[#e64833]">
//                   <div class="flex flex-col  mx-2  bg-white    shadow md:flex-row md:max-w-xl  ">
//                     <img class=" h-20" src={val.img} alt={val.name} />
//                     <div class="flex flex-col justify-between pl-2 leading-normal">
//                       <p class="mb-3 font-normal text-black">
//                         {truncateText(val.description, characterLimit)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ))}
//           </Slider>
//         </div>
//       </div>
//       <div className="mt-20 overflow-hidden">
//         <div className="bg-slate-100  h-96">
//           <div className="flex justify-between pt-5 w-full px-4  sm:w-full md:w-full xl:w-[78%] mx-auto">
//             <div className="flex gap-2">
//               <MdAutoStories className="h-14 w-14 text-[#e64833]" />
//               <div>
//                 <p className="font-bold text-lg sm:text-lg md:text-lg lg:text-2xl">
//                   Latest stories
//                 </p>
//                 <p className="font-medium text-xs sm:text-sm text-gray-600">
//                 {/* <p className="font-medium text-xs sm:text-base md:text-base lg:text-lg xl:text-sm text-gray-600"> */}
//                   Stories full of vigor and impact.
//                 </p>
//               </div>
//             </div>
//             <button
//               type="button"
//               // onClick={handlenavigate1}
//               onClick={() => handlenavigate1("Stories", "Stories full of vigor and impact.")}
//               // to={item === "Home" ? "/" : `/category/${item}`}
//               class="py-2 px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border  dark:bg-white dark:text-black dark:border-[#e64833] dark:hover:text-white dark:hover:bg-[#e64833]"
//             >
//               View More
//             </button>
//           </div>
//         </div>
//         <div className="w-full mx-auto -mt-72 mb-20">
//           <Slider
//             {...settings2}
//             className="slider-container px-6  sm:w-full md:w-full grid space-y-7 justify-center xl:w-[93%] mx-auto"
//           >
//             {slider.map((val) => (
//               <div
//                 key={val.id}
//                 onClick={() => handlenavigate(val)}
//                 className="relative  sm:!w-[95%] md:!w-[95%] lg:!w-[314px] ml-1 xl:!w-[305px] 2xl:!w-[345px] grid justify-center mx-auto mt-5 mb-14 h-[350px] hover:ml-2 bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//               >
//                 <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                   <img
//                     className="rounded-t-xl w-full h-[200px] object-cover"
//                     src={val.img}
//                     alt={val.name}
//                   />
//                 </a>
//                 <div className="px-5 py-3">
//                   <div className="flex justify-between items-center py-2">
//                     <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                       {val.date}
//                     </h5>
//                     <a
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handlenavigatetag(val.btn);
//                     }}
//                     className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-red-500 bg-red-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
//                   >
//                     {val.btn}
//                   </a>
//                   </div>
//                   <p className=" font-medium text-black h-20 py-3">
//                   {truncateText(val.description, 50)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//       <div className="w-full h-full  mx-auto rounded-2xl sm:w-full sm:h-full md:w-full md:h-full xl:w-[70%] xl:h-[50%]">
//         <div className="flex justify-between pt-10 w-full px-4  sm:w-full md:w-full xl:w-[90%] mx-auto">
//           <div className="flex gap-2">
//             <FaTachographDigital className="h-14 w-14 text-[#e64833]" />
//             <div>
//               <p className="font-bold text-lg sm:text-lg md:text-lg lg:text-2xl">
//                 Insights
//               </p>
//               <p className="font-medium text-xs sm:text-sm text-gray-600">
//                 Digging deeper in the accuracy
//               </p>
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={() => handlenavigate1("Insights", "Digging deeper in the accuracy")}
//             class=" px-5 mb-2 sm:text-sm text-xs font-medium shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none rounded-full border  dark:bg-white dark:text-black dark:border-[#e64833] dark:hover:text-white dark:hover:bg-[#e64833]"
//           >
//             View More
//           </button>
//         </div>
//         <div className="slider-container px-6 sm:w-full hidden lg:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 justify-between md:w-full xl:w-[90%] mx-auto">
//           {slider2.map((val) => (
//             <div
//               key={val.id}
//               onClick={() => handlenavigate(val)}
//               className="relative grid justify-center col-span-1 mx-auto m-5 h-[370px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//             >
//               <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                 <img
//                   className="rounded-t-xl w-full h-fit object-cover"
//                   src={val.img}
//                   alt={val.name}
//                 />
//               </a>
//               <div className="px-5 space-y-5">

//               <div className="flex justify-between items-center py-2">
//                   <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                     {val.date}
//                   </h5>
//                   <a
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handlenavigatetag(val.btn);
//                   }}
//                   className="inline-flex uppercase relative items-center cursor-pointer px-2  text-xs font-medium text-red-500 bg-red-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
//                 >
//                   {val.btn}
//                 </a>
//               </div>
//                 <p className="mb-3 font-medium text-black ">
//                 {truncateText(val.description, 45)}
//                 </p>

//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="block lg:hidden">
//           <Slider
//             {...settings3}
//             className="slider-container px-6 sm:w-full md:w-full grid justify-center xl:w-[90%] mx-auto overflow-hidden"
//           >
//             {slider2.map((val) => (
//               <div
//                 key={val.id}
//                 onClick={() => handlenavigate(val)}
//                 className="relative sm:!w-[95%] md:!w-[95%] lg:!w-[314px] xl:!w-[305px] 2xl:!w-[345px] grid justify-center mx-auto m-5 h-[380px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//               >
//                 <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                   <img
//                     className="rounded-t-xl w-full h-[200px] object-cover"
//                     src={val.img}
//                     alt={val.name}
//                   />
//                 </a>
//                 <div className="p-5 space-y-3">
//                   <div className="flex justify-between items-center py-2">
//                     <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                       {val.date}
//                     </h5>
//                     <a
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevents triggering handlenavigate when button is clicked
//                       handlenavigatetag(val.btn);
//                     }}
//                     className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-red-500 bg-red-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
//                   >
//                     {val.btn}
//                   </a>
//                   </div>
//                   <p className=" font-medium text-black ">
//                   {truncateText(val.description, 45)}
//                   </p>

//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

// import React from 'react'
// import Slider from './slider'
// import LatestStories from './lateststories'
// import InsightsStories from './insightsStories'
// import ChangeMaker from './changemaker'
// import StartUp from './startUp'
// import Inspiration from './inspiration'
// import StartUpTV from './startUpTV'
// import Review from './review'
// import Learn from './learn'
// import Sponsored from './sponsored'

// const Home = () => {
//   return (
//     <>
//     <Slider/>
//     <LatestStories/>
//     <InsightsStories/>
//     {/* <ChangeMaker/> */}
//     {/* <StartUp/> */}
//     {/* <Inspiration/> */}
//     {/* <StartUpTV/> */}
//     {/* <Review/> */}
//     {/* <Learn/> */}
//     {/* <Sponsored/> */}
//     </>
//   )
// }
// export default Home

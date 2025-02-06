import React, { useEffect, useState } from "react";
import categorybg from "../../src/images/comonbgimage.webp";
// import categorybg from "../../src/images/categorybackgroundimage.jpg";
import slider1 from "../../src/images/slider1.jpg";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const location = useLocation();
  // const routeName = location.pathname.split("/")[1];
  const { category } = useParams();
  const description = location.state?.description || "No description available";
  const { categoryName } = location.state || {};
  const { categoryDescription } = location.state || {};
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState([]);
   const [categoryata, setCategorydata] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tag/all", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("TAG Response:", response.data);
        setTag(response.data.Tags);
      } catch (error) {
        console.error("Error in API call:", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        setLoading(true);

        // First, fetch all categories
        const response = await axios.get(
          `http://localhost:5000/news/CategoryWisenews` // Remove /category from the endpoint
        );

        console.log("API Response:", response.data);

        // Format the category name to match the backend data structure
        let formattedCategory;
        switch (category?.toLowerCase()) {
          case "stories":
            formattedCategory = "Latest Stories";
            break;
          case "insights":
            formattedCategory = "Insight";
            break;
          case "change-makers":
            formattedCategory = "Change Makers";
            break;
          default:
            formattedCategory = category;
        }

        // Find the matching category in the response
        const categoryData = response?.data?.categoryWiseNews?.find(
          (cat) => cat?.categoryName === formattedCategory
        );

        if (categoryData && categoryData.news) {
          // Filter only active news items if needed
          const activeNews = categoryData?.news?.filter(
            (news) => news?.Status === "active"
          );
          setStories(activeNews);
        } else {
          setStories([]);
        }
      } catch (error) {
        console.error("Error fetching category-wise news:", error);
        // Log more detailed error information
        if (error.response) {
          console.error("Error response:", {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          });
        }
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryNews();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [category]);

  const capitalizeCategoryName = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  const handlenavigate1 = (category) => {
    const formattedCategory = capitalizeCategoryName(category);
    navigate(`/category/${formattedCategory}`, {
      state: { categoryName: formattedCategory },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlenavigate = (story) => {
    // navigate("/newsdetails/:id", { state: { story } });
    navigate(`/newsdetails/${story._id}`, { state: { story } });
  };

  // const capitalizeTagName = (tag) => {
  //   return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
  // };

  const handlenavigatetag = (tag) => {
    // const formattedTag = capitalizeTagName(tag);
    navigate(`/tag/${tag}`, {
      state: { tagName: tag },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cardsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = stories.slice(indexOfFirstCard, indexOfLastCard);
  // const currentCards = Array.isArray(stories) ? stories.slice(indexOfFirstCard, indexOfLastCard) : [];
  const totalPages = Math.ceil(stories.length / cardsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      <div className=" mt-24 ">
        <div className="relative w-full h-[300px] ">
          <img
            src={categorybg}
            alt="Footer Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 w-full px-4 sm:w-full md:w-full xl:w-[65%] gap-2 mx-auto flex flex-col justify-center sm:text-start text-center text-white">
            <p className="font-bold text-5xl">{categoryName || category}</p>
            <p className="font-medium text-xl text-gray-200">
              {categoryDescription || description}
            </p>
            <button className="relative w-36 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none self-center sm:self-start">
              <span className="relative px-11 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-blue-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Follow
              </span>
            </button>
          </div>

          {/* <div className="absolute inset-0 w-full px-4  sm:w-full md:w-full xl:w-[65%] gap-2 mx-auto flex flex-col justify-center sm:text-start   text-center   text-white">
            <p className="font-bold text-5xl ">{categoryName || category}</p>
            <p className="font-medium text-xl text-gray-200">
              {categoryDescription || description}
            </p>
            <button class="relative w-36 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none ">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-blue-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Purple to blue
              </span>
            </button>
          </div> */}
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 w-full px-4  sm:w-full md:w-full xl:w-[65%]">
            <div className="col-span-1 bg-[#ddd] h-96 p-2 mt-5 sm:block hidden  rounded-xl">
              <h1 className="font-semibold text-2xl">Tags</h1>
              <div className="px-7 h-64 py-4 mt-5  overflow-y-auto overflow-x-auto border-b-2 border-black">
                {tag.map((val) => {
                  return (
                    <ul key={val._id} className="list-disc pl-5 ">
                      <li
                        onClick={() => handlenavigatetag(val.tag)}
                        className="font-normal text-base cursor-pointer text-slate-700 marker:text-black hover:text-black hover:underline hover:font-medium"
                      >
                        {val.tag}
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div>
            <div className="col-span-3">
              {loading ? (
                <div className="text-center py-10">Loading...</div>
              ) : (
                <div className="slider-container  sm:w-full grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 justify-between md:w-full xl:w-[90%] mx-auto">
                  {currentCards?.length > 0 ? (
                    currentCards.map((story) => {
                      return (
                        <>
                          {/* {currentCards.map((val) => ( */}
                          <div
                            key={story?._id}
                            to={`/newsdetails/${story?.id}`}
                            // state={{ story: val }}
                            onClick={() => handlenavigate(story)}
                            className="relative grid justify-center col-span-1 mx-auto m-5 h-[350px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                          >
                            <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
                              <img
                                className="rounded-t-xl w-full h-fit object-cover"
                                src={
                                  story?.heroimage ||
                                  "../../src/images/slider1.jpg"
                                }
                                alt={story?.heading}
                              />
                            </a>
                            <div className="px-5">
                              {/* <div className="flex justify-between items-center"> */}
                              <h5 className="my-5 text-xs tracking-tight text-gray-600 transition-colors duration-300">
                                {new Date(story?.NewsDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </h5>
                              {/* </div> */}
                              <p className="mb-3 font-medium text-black">
                                {/* {truncateText(val.description, 40)} */}
                                {/* {story.categoryDetails?.category || ""} */}
                                {truncateText(story?.summery, 40)}
                              </p>
                              <a
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlenavigatetag(story.tagDetails.tag);
                                  // handlenavigatetag(story.tagId);
                                }}
                                className=" cursor-pointer uppercase px-2 w-fit h-fit text-xs font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-[#4360ac] hover:text-white shadow hover:shadow-lg"
                              >
                                {/* {val.btn} */}
                                {story?.tagDetails.tag}
                              </a>
                            </div>
                          </div>
                          {/* ))} */}
                          {/* </div> */}
                        </>
                      );
                    })
                  ) : (
                    <div className="col-span-full text-center py-10">
                      No stories found for this category
                    </div>
                  )}
                </div>
              )}
              <div className="flex justify-between items-center my-7">
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#4360ac] rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={currentPage === 1}
                >
                  <FaArrowLeftLong />
                  Previous
                </button>
                <p className="text-sm font-medium text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#4360ac] rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={currentPage === totalPages}
                >
                  Next
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;

// import React, { useEffect, useState } from "react";
// import categorybg from "../../src/images/categorybackgroundimage.jpg";
// import slider1 from "../../src/images/slider1.jpg";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const slider = [
//   {
//     id: 1,
//     img: slider1,
//     name: "Meylitha",
//     date: "May 2, 2023",
//     description: "QuiD Cash Raises $4.5 Million in Pre-Series A Funding",
//     btn: "News",
//   },
//   {
//     id: 2,
//     img: slider1,
//     name: "Jackson",
//     date: "May 2, 2023",
//     description:
//       "How This Founder Turned ₹18 Lakhs into ₹8 Crore in Revenue The Océglōw Success Story",
//     btn: "Startups",
//   },
//   {
//     id: 3,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       "Zuvelio Redefining Jewelry with Innovation and Sustainability   ",
//     btn: "FundingAlerts",
//   },
//   {
//     id: 4,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "FundingAlerts",
//   },
//   {
//     id: 5,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups",
//   },
//   {
//     id: 6,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "News",
//   },
//   {
//     id: 7,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups",
//   },
//   {
//     id: 8,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "FundingAlerts",
//   },
//   {
//     id: 9,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "News",
//   },
//   {
//     id: 10,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "News",
//   },
//   {
//     id: 11,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "FundingAlerts",
//   },
//   {
//     id: 12,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Paris",
//   },
//   {
//     id: 13,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups",
//   },
//   {
//     id: 14,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "News",
//   },
//   {
//     id: 15,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "FundingAlerts",
//   },
//   {
//     id: 16,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Paris",
//   },
//   {
//     id: 17,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups",
//   },
//   {
//     id: 18,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Paris",
//   },
//   {
//     id: 19,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups",
//   },
// ];

// const tagslist = ["News", "Insights", "Startups", "FundingAlerts", "Paris"];

// const Category = () => {
//   const location = useLocation();
//   // const routeName = location.pathname.split("/")[1];
//   const { category } = useParams();
//   const description = location.state?.description || "No description available";
//   const { categoryName } = location.state || {};
//   const { categoryDescription } = location.state || {};
//   const navigate = useNavigate();
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   window.scrollTo({ top: 0, behavior: "smooth" });
//   // }, []);

//   // useEffect(() => {
//   //   window.scrollTo({ top: 0, behavior: "smooth" });

//   //   const fetchNewsByCategory = async () => {
//   //     setLoading(true);
//   //     setError(null);
//   //     try {
//   //       const response = await axios.post(
//   //         "http://localhost:5000/news/CategoryWiseNewsById",
//   //         new URLSearchParams({ categoryId: "679ca4727e24e9b3a7d37fd3" }),
//   //         { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//   //       );
//   //       setStories(response.data || []);
//   //     } catch (err) {
//   //       setError("Failed to load news. Please try again later.");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchNewsByCategory();
//   // }, [category]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });

//     const fetchNewsByCategory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/news/CategoryWiseNewsById",
//           new URLSearchParams({ categoryId: "679ca4727e24e9b3a7d37fd3" }),
//           { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//         );
//         // console.log(response.data.categoryWiseNews[0].news, "response.data");

//         // Check if response.data is an array before setting it to state
//         if ((response.data)) {
//           setStories(response.data.categoryWiseNews[0].news);
//         } else {
//           setStories([]);  // Set it to an empty array if it's not in the expected format
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load news. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNewsByCategory();
//   }, [category]);

//   const capitalizeCategoryName = (category) => {
//     return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
//   };

//   const handlenavigate1 = (category) => {
//     const formattedCategory = capitalizeCategoryName(category);
//     navigate(`/category/${formattedCategory}`, {
//       state: { categoryName: formattedCategory },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handlenavigate = (story) => {
//     // navigate("/newsdetails/:id", { state: { story } });
//     navigate(`/newsdetails/${story._id}`, { state: { story } });
//   };

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

//   // const [stories, setStories] = useState([]);

//   // useEffect(() => {
//   //   // Fetch news for the specific category
//   //   fetch(`https://dummyjson.com/news?category=${category}`)
//   //     .then((res) => res.json())
//   //     .then((data) => setStories(data));
//   // }, [category]);

//   const cardsPerPage = 9;
//   const [currentPage, setCurrentPage] = useState(1);

//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   // const currentCards = stories.slice(indexOfFirstCard, indexOfLastCard);

//   const totalPages = Math.ceil(stories.length / cardsPerPage);

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const truncateText = (text, maxLength) => {
//     return text.length > maxLength
//       ? text.substring(0, maxLength) + "..."
//       : text;
//   };

//   return (
//     <>
//       <div className=" mt-24 ">
//         <div className="relative w-full h-[300px] ">
//           <img
//             src={categorybg}
//             alt="Footer Background"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 w-full px-4  sm:w-full md:w-full xl:w-[65%] gap-2 mx-auto flex flex-col justify-center sm:text-start  text-center   text-white">
//             <p className="font-bold text-5xl ">{categoryName || category}</p>
//             <p className="font-medium text-xl text-gray-200">
//               {categoryDescription || description}
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-center items-center w-full">
//           <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 w-full px-4  sm:w-full md:w-full xl:w-[65%]">
//             <div className="col-span-1 bg-[#ddd] h-96 p-2 mt-5 sm:block hidden  rounded-xl">
//               <h1 className="font-semibold text-2xl">Tags</h1>
//               <div className="px-7 h-64 py-4 mt-5  overflow-y-auto overflow-x-auto border-b-2 border-black">
//                 {tagslist.map((val) => {
//                   return (
//                     <ul key={val} className="list-disc pl-5 ">
//                       <li
//                         onClick={() => handlenavigatetag(val)}
//                         className="font-normal text-base cursor-pointer text-slate-700 marker:text-black hover:text-black hover:underline hover:font-medium"
//                       >
//                         {val}
//                       </li>
//                     </ul>
//                   );
//                 })}
//               </div>
//             </div>
//             <div className="col-span-3">
//                 <>
//                   <div className="slider-container  sm:w-full grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 justify-between md:w-full xl:w-[90%] mx-auto">
//                     {stories.map((val) => (
//                       <div
//                         key={val.id}
//                         to={`/newsdetails/${val._id}`}
//                         // state={{ story: val }}
//                         onClick={() => handlenavigate(val)}
//                         className="relative grid justify-center col-span-1 mx-auto m-5 h-[350px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//                       >
//                         <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                           <img
//                             className="rounded-t-xl w-full h-fit object-cover"
//                             src={val.heroimage}
//                             alt={val.heading}
//                           />
//                         </a>
//                         <div className="px-5 ">
//                           {/* <div className="flex justify-between items-center"> */}
//                             <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                               {/* {val.date} */}
//                               {new Date(val?.NewsDate).toLocaleDateString(
//                                 "en-US",
//                                 {
//                                   year: "numeric",
//                                   month: "long",
//                                   day: "numeric",
//                                 }
//                               )}{" "}
//                             </h5>

//                           {/* </div> */}
//                           <p className="mb-3 font-medium text-black">
//                             {truncateText(val.summery, 40)}
//                           </p>
//                           <a
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handlenavigatetag(val.heading);
//                               }}
//                               className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-red-500 bg-red-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
//                             >
//                               {val.heading}
//                             </a>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               {/* <div className="slider-container  sm:w-full grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 justify-between md:w-full xl:w-[90%] mx-auto">
//                 {currentCards.map((val) => (
//                   <div
//                     key={val.id}
//                     to={`/newsdetails/${val.id}`}
//                     state={{ story: val }}
//                     onClick={() => handlenavigate(val)}
//                     className="relative grid justify-center col-span-1 mx-auto m-5 h-[350px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//                   >
//                     <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                       <img
//                         className="rounded-t-xl w-full h-fit object-cover"
//                         src={val.img}
//                         alt={val.name}
//                       />
//                     </a>
//                     <div className="px-5 grid gap-2">
//                       <div className="flex justify-between items-center">
//                         <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                           {val.date}
//                         </h5>
//                         <a
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handlenavigatetag(val.btn);
//                           }}
//                           className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-red-500 bg-red-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
//                         >
//                           {val.btn}
//                         </a>
//                       </div>
//                       <p className="mb-3 font-medium text-black">
//                         {truncateText(val.description, 40)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div> */}
//               <div className="flex justify-between items-center my-7">
//                 <button
//                   onClick={handlePrevious}
//                   className="px-4 py-2 text-sm font-medium text-white bg-[#e64833] rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
//                   disabled={currentPage === 1}
//                 >
//                   <FaArrowLeftLong />
//                   Previous
//                 </button>
//                 <p className="text-sm font-medium text-gray-600">
//                   Page {currentPage} of {totalPages}
//                 </p>
//                 <button
//                   onClick={handleNext}
//                   className="px-4 py-2 text-sm font-medium text-white bg-[#e64833] rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                   <FaArrowRightLong />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Category;

// import React, { useEffect, useState } from "react";
// import categorybg from "../../src/images/categorybackgroundimage.jpg";
// import slider1 from "../../src/images/slider1.jpg";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// const slider = [
//   {
//     id: 1,
//     img: slider1,
//     name: "Meylitha",
//     date: "May 2, 2023",
//     description: "QuiD Cash Raises $4.5 Million in Pre-Series A Funding",
//     btn: "News",
//   },
//   {
//     id: 2,
//     img: slider1,
//     name: "Jackson",
//     date: "May 2, 2023",
//     description:
//       "How This Founder Turned ₹18 Lakhs into ₹8 Crore in Revenue The Océglōw Success Story",
//     btn: "Startups",
//   },
//   {
//     id: 3,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       "Zuvelio Redefining Jewelry with Innovation and Sustainability   ",
//     btn: "FundingAlerts",
//   },
//   {
//     id: 4,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "FundingAlerts",
//   },
//   {
//     id: 5,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups",
//   },
//   {
//     id: 6,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "News",
//   },
//   {
//     id: 7,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups",
//   },
//   {
//     id: 8,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "FundingAlerts",
//   },
//   {
//     id: 9,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "News",
//   },
//   {
//     id: 10,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "News",
//   },
//   {
//     id: 11,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "FundingAlerts",
//   },
//   {
//     id: 12,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Paris",
//   },
//   {
//     id: 13,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups",
//   },
//   {
//     id: 14,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "News",
//   },
//   {
//     id: 15,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "FundingAlerts",
//   },
//   {
//     id: 16,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Paris",
//   },
//   {
//     id: 17,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups",
//   },
//   {
//     id: 18,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Paris",
//   },
//   {
//     id: 19,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups",
//   },
// ];

// const tagslist = ["News", "Insights", "Startups", "FundingAlerts", "Paris"];

// const Category = () => {
//   const location = useLocation();
//   // const routeName = location.pathname.split("/")[1];
//   const { category } = useParams();
//   const description = location.state?.description || "No description available";
//   const { categoryName } = location.state || {};
//   const { categoryDescription } = location.state || {};
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   const capitalizeCategoryName = (category) => {
//     return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
//   };

//   const handlenavigate1 = (category) => {
//     const formattedCategory = capitalizeCategoryName(category);
//     navigate(`/category/${formattedCategory}`, {
//       state: { categoryName: formattedCategory },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handlenavigate = (story) => {
//     // navigate("/newsdetails/:id", { state: { story } });
//     navigate(`/newsdetails/${story.id}`, { state: { story } });
//   };

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

//   // const [stories, setStories] = useState([]);

//   // useEffect(() => {
//   //   // Fetch news for the specific category
//   //   fetch(`https://dummyjson.com/news?category=${category}`)
//   //     .then((res) => res.json())
//   //     .then((data) => setStories(data));
//   // }, [category]);

//   const cardsPerPage = 9;
//   const [currentPage, setCurrentPage] = useState(1);

//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = slider.slice(indexOfFirstCard, indexOfLastCard);

//   const totalPages = Math.ceil(slider.length / cardsPerPage);

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const truncateText = (text, maxLength) => {
//     return text.length > maxLength
//       ? text.substring(0, maxLength) + "..."
//       : text;
//   };

//   return (
//     <>
//       <div className=" mt-24 ">
//         <div className="relative w-full h-[300px] ">
//           <img
//             src={categorybg}
//             alt="Footer Background"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 w-full px-4  sm:w-full md:w-full xl:w-[65%] gap-2 mx-auto flex flex-col justify-center sm:text-start  text-center   text-white">
//             <p className="font-bold text-5xl ">{categoryName || category}</p>
//             <p className="font-medium text-xl text-gray-200">
//               {categoryDescription || description}
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-center items-center w-full">
//           <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 w-full px-4  sm:w-full md:w-full xl:w-[65%]">
//             <div className="col-span-1 bg-[#ddd] h-96 p-2 mt-5 sm:block hidden  rounded-xl">
//               <h1 className="font-semibold text-2xl">Tags</h1>
//               <div className="px-7 h-64 py-4 mt-5  overflow-y-auto overflow-x-auto border-b-2 border-black">
//                 {tagslist.map((val) => {
//                   return (
//                     <ul key={val} className="list-disc pl-5 ">
//                       <li
//                         onClick={() => handlenavigatetag(val)}
//                         className="font-normal text-base cursor-pointer text-slate-700 marker:text-black hover:text-black hover:underline hover:font-medium"
//                       >
//                         {val}
//                       </li>
//                     </ul>
//                   );
//                 })}
//               </div>
//             </div>
//             <div className="col-span-3">
//               <div className="slider-container  sm:w-full grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 justify-between md:w-full xl:w-[90%] mx-auto">
//                 {currentCards.map((val) => (
//                   <div
//                     key={val.id}
//                     to={`/newsdetails/${val.id}`}
//                     state={{ story: val }}
//                     onClick={() => handlenavigate(val)}
//                     className="relative grid justify-center col-span-1 mx-auto m-5 h-[350px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
//                   >
//                     <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
//                       <img
//                         className="rounded-t-xl w-full h-fit object-cover"
//                         src={val.img}
//                         alt={val.name}
//                       />
//                     </a>
//                     <div className="px-5 grid gap-2">
//                       <div className="flex justify-between items-center">
//                         <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                           {val.date}
//                         </h5>
//                         <a
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handlenavigatetag(val.btn);
//                         }}
//                         className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-red-500 bg-red-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
//                       >
//                         {val.btn}
//                       </a>
//                       </div>
//                       <p className="mb-3 font-medium text-black">
//                       {truncateText(val.description, 40)}
//                       </p>

//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-between items-center my-7">
//                 <button
//                   onClick={handlePrevious}
//                   className="px-4 py-2 text-sm font-medium text-white bg-[#e64833] rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
//                   disabled={currentPage === 1}
//                 >
//                   <FaArrowLeftLong />
//                   Previous
//                 </button>
//                 <p className="text-sm font-medium text-gray-600">
//                   Page {currentPage} of {totalPages}
//                 </p>
//                 <button
//                   onClick={handleNext}
//                   className="px-4 py-2 text-sm font-medium text-white bg-[#e64833] rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                   <FaArrowRightLong />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Category;

import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import categorybg from "../../src/images/comonbgimage.webp";
// import categorybg from "../../src/images/categorybackgroundimage.jpg";
import slider1 from "../../src/images/slider1.jpg";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const slider = [
  {
    id: 1,
    img: slider1,
    name: "Meylitha",
    date: "May 2, 2023",
    description: "QuiD Cash Raises $4.5 Million in Pre-Series A Funding",
    btn: "News",
  },
  // Add other slider items here...
];

const Tag = () => {
  const location = useLocation();
  const { tag } = useParams();
  const { tagName } = location.state || {};
  const navigate = useNavigate();

  const [tagslist, setTagslist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const cardsPerPage = 9;
  const [tagCollection, setTag] = useState([]);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let payload = {
          'categoryId': '679ca4727e24e9b3a7d37fd3',
          'tagId': '679ca858ff4bcb073a52c9bf' 
        };
        const response = await axios.post(
          "http://localhost:5000/news/categoryAndTagWiseNews",payload
        );
        const data = response.data;
        console.log(response, "response-----");
        console.log(data.categoryAndTagWiseNews[0].news.map((val) => val.tagDetails.tag), "datadatadata");
        // setTagslist(data.categoryAndTagWiseNews[0].news.map((val) => val.tagDetails.tag))
        setTagslist(data.categoryAndTagWiseNews[0].news)
        setLoading(false);
      } catch (error) {
      console.error("Error fetching data:", error);
      }
      };

fetchData();
}, []);

  const handlenavigate = (story) => {
    navigate(`/newsdetails/${story.id}`, { state: { story } });
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const filteredCards = slider.filter(
    (val) => val.btn === tagName
    // (val) => val.btn.toLowerCase() === tagName.toLowerCase()
  );
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

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

  const isNextDisabled =
    currentPage === totalPages || currentCards.length === 0;
  const isPreviousDisabled = currentPage === 1;

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // TagName Navigate
  // const capitalizeTagName = (tag) => {
  //   return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
  // };

  const handlenavigatetag = (tag) => {
    // const formattedTag = capitalizeTagName(tag);
    navigate(`/tag/${tag}`, {
      state: { tagName: tag },
    });
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-24">
      <div className="relative w-full h-[300px]">
        <img
          src={categorybg}
          alt="Footer Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 w-full px-4 sm:w-full md:w-full xl:w-[65%] gap-2 mx-auto flex flex-col justify-center sm:text-start text-center text-white">
          <p className="font-bold text-5xl">{tagName || tag}</p>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 w-full px-4 sm:w-full md:w-full xl:w-[65%]">
          <div className="col-span-1 bg-[#ddd] h-96 p-2 mt-5 sm:block hidden rounded-xl">
            <h1 className="font-semibold text-2xl">Tags</h1>
            <div className="px-7 h-64 py-4 mt-5 overflow-y-auto overflow-x-auto border-b-2 border-black">
              {loading ? (
                <p>Loading tags...</p>
              ) : (
                tagCollection.map((val) => (
                  <ul key={val._id} className="list-disc pl-5">
                    <li
                      onClick={() => handlenavigatetag(val.tag)}
                      className="font-normal text-base cursor-pointer text-slate-700 marker:text-black hover:text-black hover:underline hover:font-medium"
                    >
                      {val.tag}
                    </li>
                  </ul>
                ))
              )}
            </div>
          </div>
          <div className="col-span-3">
            <div className="slider-container sm:w-full grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 justify-between md:w-full xl:w-[90%] mx-auto">
              {tagslist.map((val) => (
                <div
                  key={val._id}
                  onClick={() => handlenavigate(val)}
                  className="relative grid justify-center col-span-1 mx-auto m-5 h-[350px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                >
                  <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
                    <img
                      className="rounded-t-xl w-full h-fit object-cover"
                      src={val.heroimage}
                      alt={val.heading}
                    />
                  </a>
                  <div className="p-5">
                    {/* <div className="flex justify-between items-center py-2"> */}
                      <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
                      {new Date(val.NewsDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                        {/* {val.NewsDate} */}
                      </h5>
                     
                    {/* </div> */}
                    <p className="mb-3 font-medium text-black h-20">
                      {truncateText(val.summery, 45)}
                    </p>
                    <a
                        onClick={(e) => {
                          e.stopPropagation();
                          handlenavigatetag(val.tag);
                        }}
                        className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-[#4360ac] bg-blue-100 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#4360ac] hover:text-white shadow hover:shadow-lg"
                      >
                        {val.tagDetails.tag}
                      </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center my-7">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-sm font-medium text-white bg-[#e64833] rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={isPreviousDisabled}
              >
                <FaArrowLeftLong />
                Previous
              </button>
              <p className="text-sm font-medium text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-[#e64833] rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={isNextDisabled}
              >
                Next
                <FaArrowRightLong />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tag;


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
//     btn: "News",
//   },
//   {
//     id: 9,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Paris",
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
//     btn: "Insights",
//   },
//   {
//     id: 12,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Funding Alerts",
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
// ];

// const tagslist = ["News", "Insights", "Startups", "Funding Alerts", "Paris"];

// const Tag = () => {
//   const location = useLocation();
//   const { tag } = useParams();
//   const { tagName } = location.state || {};
//   const navigate = useNavigate();

//   const cardsPerPage = 9;
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);


//   //NewsDetails Navigate
//   const handlenavigate = (story) => {
//     navigate(`/newsdetails/${story.id}`, { state: { story } });
//   };



//   //TagName Navigate
//   const capitalizeTagName = (tag) => {
//     return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
//   };

//   const handlenavigatetag = (tag) => {
//     const formattedTag = capitalizeTagName(tag);
//     navigate(`/tag/${formattedTag}`, {
//       state: { tagName: formattedTag },
//     });
//     setCurrentPage(1);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // const [stories, setStories] = useState([]);

//   // useEffect(() => {
//   //   // Fetch news for the specific category
//   //   fetch(`https://dummyjson.com/news?category=${category}`)
//   //     .then((res) => res.json())
//   //     .then((data) => setStories(data));
//   // }, [category]);



//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const filteredCards = slider.filter(
//     (val) => val.btn.toLowerCase() === tagName.toLowerCase()
//   );
//   const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
//   const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

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

//   const isNextDisabled =
//     currentPage === totalPages || currentCards.length === 0;
//   const isPreviousDisabled = currentPage === 1;

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
//             <p className="font-bold text-5xl ">{tagName || tag}</p>
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
//                     <div className="p-5">
//                       <div className="flex justify-between items-center py-2">
//                         <h5 className="mb-2 text-xs tracking-tight text-gray-600 transition-colors duration-300">
//                           {val.date}
//                         </h5>
//                         <a
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handlenavigatetag(val.btn);
//                         }}
//                         className="inline-flex uppercase relative items-center px-2 text-xs font-medium text-red-500 bg-red-100 rounded-lg transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
//                       >
//                         {val.btn}
//                       </a>
//                       </div>
//                       <p className="mb-3 font-medium text-black h-20">
//                       {truncateText(val.description, 45)}
//                       </p>
                      
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-between items-center my-7">
//                 <button
//                   onClick={handlePrevious}
//                   className="px-4 py-2 text-sm font-medium text-white bg-[#e64833] rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
//                   disabled={isPreviousDisabled}
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
//                   disabled={isNextDisabled}
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

// export default Tag;

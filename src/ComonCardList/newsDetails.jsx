import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import slider1 from "../../src/images/slider1.jpg";
import axios from "axios";

const slider = [
  {
    id: 1,
    img: slider1,
    name: "Meylitha",
    date: "May 2, 2023",
    description: "QuiD Cash Raises $4.5 Million in Pre-Series A Funding",
    btn: "Insights",
  },
  {
    id: 2,
    img: slider1,
    name: "Jackson",
    date: "May 2, 2023",
    description:
      "How This Founder Turned ₹18 Lakhs into ₹8 Crore in Revenue The Océglōw Success Story",
    btn: "Startups",
  },
  {
    id: 3,
    img: slider1,
    name: "Jonh Ali",
    date: "May 2, 2023",
    description: "From Jaipur to the World",
    btn: "Paris",
  },
  {
    id: 4,
    img: slider1,
    name: "Jonh Ali",
    date: "May 2, 2023",
    description:
      " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
    btn: "News",
  },
  {
    id: 5,
    img: slider1,
    name: "Jonh Ali",
    date: "May 2, 2023",
    description:
      " Jaipur to the World: The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
    btn: "Startups",
  },
  {
    id: 6,
    img: slider1,
    name: "Jonh Ali",
    date: "May 2, 2023",
    description:
      "To the World: The Story of Zuvelio  Redefining Jewelry with Innovation and Sustainability",
    btn: "Insights",
  },
];

const NewsDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const { story } = location.state || {};
  const navigate = useNavigate();
 
  const [insights, setInsights] = useState([]);
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          categoryId: story?.categoryId || "679ca4727e24e9b3a7d37fd3",
          tagId: story?.tagId || "679ca858ff4bcb073a52c9bf",
          newsId: story?._id || id || "679cb6915c8c47edadb07a24",
        };

        const headers = {
          "Content-Type": "application/json",
        };

        const response = await axios.post(
          "http://localhost:5000/news/categoryTagNewsWiseNews",
          payload,
          { headers }
        );

        if (response.data && response.data.categoryTagAndNewsWiseNews) {
          setNewsData(response.data.categoryTagAndNewsWiseNews[0]);
          setInsights(response.data.categoryTagAndNewsWiseNews);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [story]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login"); // Redirect to login if user is not logged in
    }
  }, [navigate]);

  //TagName Navigate
  
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

  //Newsdetails navigate
  const handlenavigate = (story) => {
    navigate(`/newsdetails/${story._id}`, { state: { story } });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [story]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="my-40">
      <div className="grid justify-center items-center w-full px-4 mx-auto  sm:w-full md:w-full xl:w-[70%]">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 ">
          <div className="lg:col-span-3 col-span-4">
            {newsData ? (
              <>
                <h1 className="text-4xl font-bold mb-4 text-center">
                  {newsData.title}
                </h1>
                <p className="text-gray-700 text-lg text-center pb-4">
                  {new Date(newsData.NewsDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <img
                  src={newsData.heroimage}
                  alt={newsData.title}
                  className="rounded-lg w-full max-h-[400px] object-cover mb-4"
                />
                <div className="rounded-md bg-[#FFF6F6] p-4 my-5">
                  <h1 className="text-[#e64833] font-bold text-3xl">Summary</h1>
                  <ul className="list-disc  list-outside grid gap-4 px-4 py-2 text-xl marker:text-[#e64833] font-normal">
                    <li className="text-gray-500 text-xl py-4">
                      {newsData.summery}
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{newsData.heading}</h2>
                  <p className="text-gray-700 text-lg">{newsData.content_1}</p>

                  {newsData.image_2 && (
                    <img
                      src={newsData.image_2}
                      alt="Content 2"
                      className="rounded-lg w-full max-h-[400px] object-cover my-4"
                    />
                  )}

                  <p className="text-gray-700 text-lg">{newsData.content_2}</p>

                  {newsData.image_3 && (
                    <img
                      src={newsData.image_3}
                      alt="Content 3"
                      className="rounded-lg w-full max-h-[400px] object-cover my-4"
                    />
                  )}

                  <div className="mt-4">
                    <span className="text-red-500 font-medium">Category: </span>
                    <span className="text-gray-700">
                      {newsData.categoryDetails.category}
                    </span>
                  </div>
                  <div>{newsData.categoryDetails.categoryContent}</div>

                  <div>
                    <span className="text-red-500 font-medium">Tag: </span>
                    <span className="text-gray-700">
                      {newsData.tagDetails.tag}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p>Loading news details...</p>
            )}
          </div>
          <div className="lg:col-span-1 col-span-2 bg-white border border-gray-200 h-fit p-2  sticky top-32  w-full   rounded-xl">
            <h1 className="font-bold text-4xl  mt-2 mb-5">Trending Stories</h1>
            {slider.map((item) => {
              return (
                <>
                  <div>
                    <a
                      onClick={() => handlenavigate(item)}
                      key={item.id}
                      class="flex flex-col items-center py-1 bg-white   shadow-sm md:flex-row md:max-w-xl border-b-2 border-gray-200 "
                    >
                      <img
                        class="object-cover w-28 rounded-t-lg h-24 md:rounded-none md:rounded-s-lg"
                        src={item.img}
                        alt={item.name}
                      />
                      <p class="mb-3 font-bold text-base sm:text-lg md:text-lg lg:text-sm xl:text-lg px-2 py-2 text-black ">
                        {truncateText(item.description, 40)}
                      </p>
                    </a>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <hr className="border mt-3 hidden lg:grid border-black" />
        <div className="slider-container  sm:w-full hidden lg:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 justify-between md:w-full xl:w-full mx-auto">
          {slider.slice(0, 4).map((val) => (
            <div
              key={val.id}
              onClick={() => handlenavigate(val)}
              className="relative grid justify-center col-span-1 mx-auto m-5 h-[370px] bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
            >
              <a className="w-full relative mx-auto h-auto overflow-hidden rounded-lg">
                <img
                  className="rounded-t-xl w-full h-fit object-cover"
                  src={val.img}
                  alt={val.name}
                />
              </a>
              <div className="p-5">
                <div className="flex justify-between items-center py-2">
                  <h5 className="mb-2 text-base tracking-tight text-gray-600 transition-colors duration-300">
                    {val.date}
                  </h5>
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                      handlenavigatetag(val.btn);
                    }}
                    className="inline-flex uppercase relative items-center px-2 text-sm font-medium text-[#4360ac] bg-blue-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-[#4360ac] hover:text-white shadow hover:shadow-lg"
                  >
                    {val.btn}
                  </a>
                </div>
                <p className="mb-3 font-medium text-black ">
                  {truncateText(val.description, 50)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;

// import React, { useEffect, useRef, useState } from "react";
// import { Link, useLocation, useNavigate, useParams } from "react-router";
// import slider1 from "../../src/images/slider1.jpg";

// const slider = [
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
//     btn: "Startups",
//   },
//   {
//     id: 3,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description: "From Jaipur to the World",
//     btn: "Paris",
//   },
//   {
//     id: 4,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "News",
//   },
//   {
//     id: 5,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       " Jaipur to the World: The Story of Zuvelio Redefining Jewelry with Innovation and Sustainability",
//     btn: "Startups",
//   },
//   {
//     id: 6,
//     img: slider1,
//     name: "Jonh Ali",
//     date: "May 2, 2023",
//     description:
//       "To the World: The Story of Zuvelio  Redefining Jewelry with Innovation and Sustainability",
//     btn: "Insights",
//   },
// ];

// const NewsDetails = () => {
//   const location = useLocation();
//   const { id } = useParams();
//   const { story } = location.state || {};
//   const navigate = useNavigate();
//   const capitalizeTagName = (tag) => {
//     return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
//   };

//   //TagName Navigate
//   const handlenavigatetag = (tag) => {
//     const formattedTag = capitalizeTagName(tag);
//     navigate(`/tag/${formattedTag}`, {
//       state: { tagName: formattedTag },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   //Newsdetails navigate
//   const handlenavigate = (story) => {
//     navigate(`/newsdetails/${story.id}`, { state: { story } });
//   };

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, [story]);

//   const truncateText = (text, maxLength) => {
//     return text.length > maxLength
//       ? text.substring(0, maxLength) + "..."
//       : text;
//   };

//   return (
//     <div className="my-40">
//       <div className="grid justify-center items-center w-full px-4 mx-auto  sm:w-full md:w-full xl:w-[70%]">
//         <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 ">
//           <div className="lg:col-span-3 col-span-4">
//             {story ? (
//               <>
//                 <h1 className="text-4xl font-bold mb-4 text-center ">
//                   {story.description}
//                 </h1>
//                 <p className="text-gray-700 text-lg text-center pb-4">
//                   {story.date}
//                 </p>
//                 <img
//                   src={story.img}
//                   alt={story.name}
//                   className="rounded-lg w-full max-h-[400px] object-cover mb-4"
//                 />
//                 <div className="rounded-md bg-[#FFF6F6] p-4 my-5">
//                 <h1 className="text-[#e64833] font-bold text-3xl">Summary</h1>
//                 <ul class="list-disc  list-outside grid gap-4 px-4 py-2 text-xl marker:text-[#e64833] font-normal">

//                   <li className="text-gray-500">
//                     Now this is a story all about how, my life got
//                     flipped-turned upside down Now this is a story all about how, my life got
//                     flipped-turned upside down
//                   </li>
//                   <li className="text-gray-500">
//                     Now this is a story all about how, my life got
//                     flipped-turned upside down
//                   </li>
//                 </ul>
//                 </div>

//                 <p className="text-gray-700 text-lg">
//                   Mumbai-based quick service platform Snabbit has secured $5.5
//                   Mn (around INR 47.6 Cr) in a Series A funding round led by
//                   Elevation Capital. The round also saw participation from its
//                   existing investor Nexus Venture Partners, along with a host of
//                   angel investors, including Meesho cofounders Vidit Aatrey and
//                   Sanjeev Barnwal; Unacademy cofounder Gaurav Munjal and
//                   Spinny’s founder Niraj Singh. Snabbit’s founder and chief
//                   executive Aayush Agarwal told Inc42 that the funds will be
//                   deployed for opening new micro markets in Mumbai over the next
//                   six to nine months and expanding its customer base. Founded by
//                   Zepto’s former chief of staff Agarwal last year, Snabbit is a
//                   quick service platform that offers domestic services such as
//                   general cleaning, laundry and similar others on demand. The
//                   company does not operate on a subscription basis, however,
//                   tends to the momentary demands that are infrequent in nature.
//                   Snabbit’s application has more than 10K downloads on Google
//                   Play Store, as of now. Agarwal said, users can book slots from
//                   three days in advance to claim a service to a last moment
//                   reservation that would be available at a notice of 10 minutes
//                   in the locations it is active, currently. Snabbit said in a
//                   statement that earlier last year it secured $1 Mn as a part of
//                   its seed funding round from Nexus Venture Partners.
//                   Mumbai-based quick service platform Snabbit has secured $5.5
//                   Mn (around INR 47.6 Cr) in a Series A funding round led by
//                   Elevation Capital. The round also saw participation from its
//                   existing investor Nexus Venture Partners, along with a host of
//                   angel investors, including Meesho cofounders Vidit Aatrey and
//                   Sanjeev Barnwal; Unacademy cofounder Gaurav Munjal and
//                   Spinny’s founder Niraj Singh. Snabbit’s founder and chief
//                   executive Aayush Agarwal told Inc42 that the funds will be
//                   deployed for opening new micro markets in Mumbai over the next
//                   six to nine months and expanding its customer base. Founded by
//                   Zepto’s former chief of staff Agarwal last year, Snabbit is a
//                   quick service platform that offers domestic services such as
//                   general cleaning, laundry and similar others on demand. The
//                   company does not operate on a subscription basis, however,
//                   tends to the momentary demands that are infrequent in nature.
//                   Snabbit’s application has more than 10K downloads on Google
//                   Play Store, as of now. Agarwal said, users can book slots from
//                   three days in advance to claim a service to a last moment
//                   reservation that would be available at a notice of 10 minutes
//                   in the locations it is active, currently. Snabbit said in a
//                   statement that earlier last year it secured $1 Mn as a part of
//                   its seed funding round from Nexus Venture Partners.
//                   Mumbai-based quick service platform Snabbit has secured $5.5
//                   Mn (around INR 47.6 Cr) in a Series A funding round led by
//                   Elevation Capital. The round also saw participation from its
//                   existing investor Nexus Venture Partners, along with a host of
//                   angel investors, including Meesho cofounders Vidit Aatrey and
//                   Sanjeev Barnwal; Unacademy cofounder Gaurav Munjal and
//                   Spinny’s founder Niraj Singh. Snabbit’s founder and chief
//                   executive Aayush Agarwal told Inc42 that the funds will be
//                   deployed for opening new micro markets in Mumbai over the next
//                   six to nine months and expanding its customer base. Founded by
//                   Zepto’s former chief of staff Agarwal last year, Snabbit is a
//                   quick service platform that offers domestic services such as
//                   general cleaning, laundry and similar others on demand. The
//                   company does not operate on a subscription basis, however,
//                   tends to the momentary demands that are infrequent in nature.
//                   Snabbit’s application has more than 10K downloads on Google
//                   Play Store, as of now. Agarwal said, users can book slots from
//                   three days in advance to claim a service to a last moment
//                   reservation that would be available at a notice of 10 minutes
//                   in the locations it is active, currently. Snabbit said in a
//                   statement that earlier last year it secured $1 Mn as a part of
//                   its seed funding round from Nexus Venture Partners.
//                   Mumbai-based quick service platform Snabbit has secured $5.5
//                   Mn (around INR 47.6 Cr) in a Series A funding round led by
//                   Elevation Capital. The round also saw participation from its
//                   existing investor Nexus Venture Partners, along with a host of
//                   angel investors, including Meesho cofounders Vidit Aatrey and
//                   Sanjeev Barnwal; Unacademy cofounder Gaurav Munjal and
//                   Spinny’s founder Niraj Singh. Snabbit’s founder and chief
//                   executive Aayush Agarwal told Inc42 that the funds will be
//                   deployed for opening new micro markets in Mumbai over the next
//                   six to nine months and expanding its customer base. Founded by
//                   Zepto’s former chief of staff Agarwal last year, Snabbit is a
//                   quick service platform that offers domestic services such as
//                   general cleaning, laundry and similar others on demand. The
//                   company does not operate on a subscription basis, however,
//                   tends to the momentary demands that are infrequent in nature.
//                   Snabbit’s application has more than 10K downloads on Google
//                   Play Store, as of now. Agarwal said, users can book slots from
//                   three days in advance to claim a service to a last moment
//                   reservation that would be available at a notice of 10 minutes
//                   in the locations it is active, currently. Snabbit said in a
//                   statement that earlier last year it secured $1 Mn as a part of
//                   its seed funding round from Nexus Venture Partners.
//                 </p>
//               </>
//             ) : (
//               <p>No story details available.</p>
//             )}
//           </div>
//           <div className="lg:col-span-1 col-span-2 bg-white border border-gray-200 h-fit p-2  sticky top-32  w-full   rounded-xl">
//             <h1 className="font-bold text-4xl  mt-2 mb-5">Trending Stories</h1>
//             {slider.map((item) => {
//               return (
//                 <>
//                   <div>
//                     <a
//                       onClick={() => handlenavigate(item)}
//                       key={item.id}
//                       class="flex flex-col items-center py-1 bg-white   shadow-sm md:flex-row md:max-w-xl border-b-2 border-gray-200 "
//                     >
//                       <img
//                         class="object-cover w-28 rounded-t-lg h-24 md:rounded-none md:rounded-s-lg"
//                         src={item.img}
//                         alt={item.name}
//                       />
//                       <p class="mb-3 font-bold text-base sm:text-lg md:text-lg lg:text-sm xl:text-lg px-2 py-2 text-black ">
//                         {truncateText(item.description, 40)}
//                       </p>
//                     </a>
//                   </div>
//                 </>
//               );
//             })}
//           </div>
//         </div>
//         <hr className="border mt-3 hidden lg:grid border-black" />
//         <div className="slider-container  sm:w-full hidden lg:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 justify-between md:w-full xl:w-full mx-auto">
//           {slider.slice(0, 4).map((val) => (
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
//               <div className="p-5">
//                 <div className="flex justify-between items-center py-2">
//                   <h5 className="mb-2 text-base tracking-tight text-gray-600 transition-colors duration-300">
//                     {val.date}
//                   </h5>
//                   <a
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handlenavigatetag(val.btn);
//                   }}
//                   className="inline-flex uppercase relative items-center px-2 text-sm font-medium text-red-500 bg-red-100 rounded-sm transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white shadow hover:shadow-lg"
//                 >
//                   {val.btn}
//                 </a>
//                 </div>
//                 <p className="mb-3 font-medium text-black ">
//                 {truncateText(val.description, 50)}
//                 </p>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsDetails;

import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import Navbar from "./Comon/navbar";
import Home from "./Components/home";
import Footer from "./Comon/footer";
import Category from "./ComonStorypage/category";
import NewsDetails from "./ComonCardList/newsDetails";
import ScrollToTop from "react-scroll-to-top";
import Tag from "./ComonStorypage/tag";
import Login from "./Register/login";
import Signup from "./Register/signup";
import Contact from "./Register/contact";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";

function App() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer); // Cleanup in case the component unmounts
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        {/* v20.11.1 */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/newsdetails/:id" element={<NewsDetails />} />
        <Route path="/tag/:tag" element={<Tag />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ScrollToTop
        smooth
        color="white"
        className="!rounded-full !flex !items-center !justify-center !w-16 !h-16 !bg-[#4360ac] !z-50 "
      />
      {isVisible && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[96%] sm:w-[80%] md:w-[70%] lg:w-[65%] bg-black bg-opacity-80 text-white p-4 z-50 rounded-lg shadow-lg flex flex-col xl:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close cookie banner"
            className="absolute -top-3 -right-2 text-white h-6 w-6 bg-black bg-opacity-80 rounded-full grid place-items-center hover:bg-opacity-100 transition-all"
          >
            <GrFormClose size={24} />
          </button>

          {/* Cookie Message */}
          <p className="text-xs font-bold text-center xl:text-left flex-1">
            This website uses cookies and similar technologies to ensure
            functionality, evaluate website usage, and to serve marketing
            content. Visit our{" "}
            <a
              href="#"
              className="underline hover:text-blue-600 transition-all"
            >
              Cookie Policy
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline hover:text-blue-600 transition-all"
            >
              Privacy Policy
            </a>{" "}
            for more information.
          </p>

          {/* Buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <button className="bg-white/30 backdrop-blur-md font-bold text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-all">
              Cookie Preferences
            </button>
            <button className="bg-white text-black px-4 font-bold py-2 rounded-full text-sm  hover:bg-gray-200 transition-all">
              Accept Cookies
            </button>
          </div>
        </div>
        // <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 sm:w-[60%] w-[96%]  bg-black bg-opacity-80 text-white p-4 !z-50 md:px-5 py-2 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 rounded-lg shadow-lg">
        //   {/* Close Button */}

        //   <button
        //     onClick={() => setIsVisible(false)}
        //     className="absolute -top-3 -right-2 text-white h-6 w-6 bg-black bg-opacity-80 rounded-full grid items-center"
        //   >
        //     <GrFormClose size={24} />
        //   </button>

        //   {/* Cookie Message */}
        //   <p className="text-sm md:text-sm text-center md:text-left">
        //     This website uses cookies and similar technologies to ensure
        //     functionality, evaluate website usage, and to serve marketing
        //     content. Visit our{" "}
        //     <a href="#" className="underline">
        //       Cookie Policy
        //     </a>{" "}
        //     and{" "}
        //     <a href="#" className="underline">
        //       Privacy Policy
        //     </a>{" "}
        //     for more information.
        //   </p>

        //   {/* Buttons */}
        //   <div className="flex gap-2">
        //     <button className="bg-gray-600 text-white px-4  rounded-md text-sm hover:bg-gray-600">
        //       Cookie Preferences
        //     </button>
        //     <button className="bg-white text-black px-4  rounded-md text-sm font-medium hover:bg-gray-300">
        //       Accept Cookies
        //     </button>
        //   </div>
        // </div>
      )}
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Footer />
      )}
    </>
  );
}

export default App;

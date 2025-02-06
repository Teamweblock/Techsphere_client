import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../src/images/Logo White_1.png";
// import logo from "../../src/images/Logo r.png";
import { useLocation, useNavigate } from "react-router";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Stories",
    description: "Stories full of vigor and impact.",
    href: "/category/Stories",
  },
  {
    name: "Insights",
    description: "Digging deeper in the accuracy",
    href: "/category/Insights",
  },
  {
    name: "HerStartup",
    description: "Highlighting women-led startups",
    href: "/category/HerStartup",
  },
];

const navigation2 = [
  {
    name: "Inspiration",
    description: "Find motivational content for entrepreneurs",
    href: "/category/Inspiration",
  },
  {
    name: "TheReview",
    description: "Reviews of products and services",
    href: "/category/TheReview",
  },
  {
    name: "Podcast",
    description: "Listen to insightful startup podcasts",
    href: "/category/Podcast",
  },
  {
    name: "StartupTV",
    description: "Watch startup stories and events",
    href: "/category/StartupTV",
  },
];

const services = [
  { name: "Home", href: "/", description: "The main page of the website." },
  { name: "Contact", href: "/contact", description: "Get in touch with us." },
  {
    name: "About Us",
    href: "/about",
    description: "Learn more about our company.",
  },
  {
    name: "StartUp Events",
    href: "/events",
    description: "Upcoming startup events.",
  },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="relative z-10 bg-[#292929]   px-16 py-24 "> 
      <footer className="max-w-screen-xl mx-auto text-white">
        <div className="grid md:grid-cols-4 justify-center mx-auto text-center gap-12">
          <div className="space-y-5">
            <div className="grid justify-center">
              <img src={logo} alt="Logo" className="h-28 p-2" />
            </div>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus.
            </p>
          </div>
          <div>
            <h2 className="mb-6 text-xl font-bold">Navigation</h2>
            {navigation.map((item) => {
              return (
                <div className="grid  text-gray-300">
                  <button
                    key={item.name}
                    aria-current={
                      item.name === location.pathname ? "page" : undefined
                    }
                    className="py-2"
                    // to={item === "Home" ? "/" : `/category/${item.name}`}
                    onClick={() => {
                      scrollToTop();
                      navigate(item.href, {
                        state: { description: item.description },
                      });
                    }}
                  >
                    {item.name}
                  </button>
                </div>
              );
            })}
          </div>
          <div>
            <h2 className="mb-6 text-xl font-bold">Quick Links</h2>
            {navigation2.map((item) => {
              return (
                <div className="grid  text-gray-300">
                  <button
                    key={item.name}
                    aria-current={
                      item.name === location.pathname ? "page" : undefined
                    }
                    className="py-2"
                    // to={item === "Home" ? "/" : `/category/${item}`}
                    onClick={() => {
                      scrollToTop();
                      navigate(item.href, {
                        state: { description: item.description },
                      });
                    }}
                  >
                    {item.name}
                  </button>
                </div>
              );
            })}
          </div>
          <div>
            <h2 className="mb-6 text-xl font-bold">Services</h2>
            {services.map((service) => (
              <div className="grid  text-gray-300" key={service.name}>
                <button
                  onClick={() => {
                    scrollToTop();
                    navigate(service.href, {
                      state: { description: service.description },
                    });
                  }}
                  className="py-2"
                >
                  {service.name}
                </button>
              </div>
            ))}
          </div>
          {/* <div className="">
            <h2 className="mb-6 text-xl font-bold">Services</h2>
            <ul className="space-y-4 text-gray-300">
              <li>Home</li>
              <li>Contact</li>
              <li>Abou Us</li>
              <li>StartUp Events</li>
            </ul>
          </div> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center mt-12">
          <div className="flex items-center justify-center space-x-3">
            <FaMapMarkerAlt className="text-[#4360ac] text-2xl" />
            <p className="text-white text-lg font-semibold">London Eye, UK</p>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <FaPhone className="text-[#4360ac] text-2xl" />
            <p className="text-white text-lg font-semibold">088-777-666-85</p>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <HiOutlineMailOpen className="text-[#4360ac] text-2xl" />
            <p className="text-white text-lg font-semibold">mail@tntech.com</p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="border border-[#4360ac] p-2">
              <FaFacebook className="text-[#4360ac] text-xl" />
            </div>
            <div className="border border-[#4360ac] p-2">
              <FaTwitter className="text-[#4360ac] text-xl" />
            </div>
            <div className="border border-[#4360ac] p-2">
              <FaYoutube className="text-[#4360ac]  text-xl" />
            </div>
          </div>
        </div>
        <hr className="my-6 border-[#4360ac]" />
        <div className="text-center text-gray-300">
          © 2025 TnTech News • All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Footer;

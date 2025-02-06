import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../src/images/Logo BB_1.png";
// import logo from "../../src/images/Logo r.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
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
    name: "Inspiration",
    description: "Find motivational content for entrepreneurs",
    href: "/category/Inspiration",
  },
  {
    name: "HerStartup",
    description: "Highlighting women-led startups",
    href: "/category/HerStartup",
  },
  {
    name: "TheReview",
    description: "Reviews of products and services",
    href: "/category/Thereview",
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

const Navbar = () => {
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleResize = () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <Disclosure
      as="nav"
      className="bg-white w-screen fixed top-0  z-50  border-b-4 border-[#4360ac] "
    >
      <div className=" !w-full  px-2 sm:px-2 lg:px-4">
        <div className="relative flex h-24 w-full items-center justify-between">
          <div className="flex shrink-0 items-center">
            <img
              alt="Your Company"
              src={logo}
              onClick={() => navigate("/")}
              className="h-14 w-auto sm:h-14 md:h-14 lg:h-14 xl:h-20"
            />
          </div>
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-center">
            <div className="hidden sm:hidden  md:hidden lg:block  sm:ml-6 ">
              <div className="flex space-x-4 items-center">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    aria-current={
                      item.name === location.pathname ? "page" : undefined
                    }
                    className={`
                     rounded-md px-1 sm:px-1 md:px-0 lg:px-2 xl:px-4 text-sm sm:text-base md:text-sm lg:text-sm xl:text-lg font-medium text-black 
                     ${
                       location.pathname === item.href
                         ? "!bg-gray-200 !text-black  px-2 py-1"
                         : "group relative w-max"
                     }
                  `}
                    onClick={() => {
                      scrollToTop();
                      navigate(item.href, {
                        state: { description: item.description },
                      });
                    }}
                  >
                    {item.name}
                    <span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-black group-hover:w-full"></span>
                  </button>
                ))}
                {/* More Button with Dropdown */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex items-center text-sm sm:text-base md:text-sm lg:text-sm xl:text-lg font-medium  w-full justify-center gap-x-1.5 rounded-md px-3 py-2   shadow-xs   ">
                      More
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 size-5 "
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="py-2">
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2  hover:bg-gray-100 text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          About US
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Resources
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2  hover:bg-gray-100 text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Press Release
                        </a>
                      </MenuItem>
                      <form method="POST">
                        <MenuItem>
                          <button
                            type="submit"
                            className="block w-full hover:bg-gray-100  px-4 py-2 text-left text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                          >
                            StartUp Events
                          </button>
                        </MenuItem>
                      </form>
                      <MenuItem>
                        <a
                          onClick={handleLogout}
                          className="block px-4 py-2 cursor-pointer hover:bg-red-50 text-red-500 font-medium data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Log Out
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
                {/* <div className="dropdown relative inline-flex  group">
                  <button
                    id="dropdown-hover"
                    type="button"
                    className="dropdown-toggle inline-flex justify-center items-center gap-2  text-sm sm:text-base md:text-sm lg:text-sm xl:text-lg font-medium text-black  rounded-full cursor-pointer  text-center shadow-xs transition-all duration-500 "
                  >
                    More
                    <svg
                      className="dropdown-open:rotate-180 w-2.5 h-2.5 text-sm sm:text-base md:text-sm lg:text-sm xl:text-lg font-medium text-black"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <div className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full w-72 mt-2 hidden group-hover:block">
                    <ul className="py-2">
                      <li>
                        <a className="block px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
                          About US
                        </a>
                      </li>
                      <li>
                        <a className="block px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
                          Resources
                        </a>
                      </li>
                      <li>
                        <a className="block px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
                          Press Release
                        </a>
                      </li>
                      <li>
                        <a className="block px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
                          StartUp Events
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handleLogout}
                          className="block px-6 py-2 cursor-pointer hover:bg-gray-100 text-red-500 font-medium"
                        >
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              <div className="flex items-center">
                <div className="bg-[#4360ac] text-white sm:flex hidden rounded-full h-12 w-12  items-center justify-center">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-[#4360ac] to-[#2bace2] hover:scale-105 hover:from-[#2bace2] hover:to-[#4360ac] transition-all duration-300 ease-in-out  text-white hidden sm:hidden md:hidden lg:block font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                LOGIN
              </button>
            )}
            <Menu as="div" className="relative ml-3">
              <div>
                <DisclosureButton className="group relative md:block lg:hidden inline-flex items-center justify-center rounded-md  text-black hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-8 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-8 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel>
        <div className="space-y-1 px-2 pb-3 pt-2 grid gap-2">
          {navigation.map((item) => (
            <>
              <button
                key={item.name}
                as="a"
                aria-current={item === location.pathname ? "page" : undefined}
                className={`
                  text-black w-36 text-start px-2  block rounded-md  py-2 text-base font-medium
                  ${
                    location.pathname === item.href
                      ? "!bg-gray-200 !text-black  px-2 py-1"
                      : ""
                  }
                `}
                // className={
                //   "text-black  hover:bg-gray-200 hover:text-black px-2  block rounded-md  py-2 text-base font-medium"
                // }
                // to={item.name === "Home" ? "/" : `/category/${item.name}`}
                onClick={() => {
                  scrollToTop();
                  navigate(item.href, {
                    state: { description: item.description },
                  });
                }}
              >
                {item.name}
              </button>
            </>
          ))}
          {/* More Button with Dropdown */}
          <Menu as="div" className="relative inline-flex group">
            <div>
              <MenuButton className="inline-flex items-center text-base sm:text-base md:text-sm lg:text-sm xl:text-lg font-medium  w-full justify-center gap-x-1.5 rounded-md px-3 py-2   shadow-xs   ">
                More
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 " />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-2">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2  hover:bg-gray-100 text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    About US
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Resources
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2  hover:bg-gray-100 text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Press Release
                  </a>
                </MenuItem>
                <form method="POST">
                  <MenuItem>
                    <button
                      type="submit"
                      className="block w-full hover:bg-gray-100  px-4 py-2 text-left text-gray-900 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      StartUp Events
                    </button>
                  </MenuItem>
                </form>
                <MenuItem>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-2 cursor-pointer hover:bg-red-50 text-red-500 font-medium data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Log Out
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
          {/* <div className="dropdown relative inline-flex group">
            <button
              id="dropdown-hover"
              type="button"
              className="dropdown-toggle px-2 inline-flex justify-center items-center gap-2  text-base font-medium text-black  rounded-full cursor-pointer  text-center shadow-xs transition-all duration-500 "
            >
              More
              <svg
                className="dropdown-open:rotate-180 w-2.5 h-2.5 text-base font-medium text-black"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full w-72 mt-2 hidden group-hover:block">
              <ul className="py-2">
                <li>
                  <a className="block px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
                    About US
                  </a>
                </li>
                <li>
                  <a className="block px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
                    Resources
                  </a>
                </li>
                <li>
                  <a className="block px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
                    Press Release
                  </a>
                </li>
                <li>
                  <a className="block px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium">
                    StartUp Events
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="block px-6 py-2 hover:bg-gray-100 text-red-500 font-medium"
                  >
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
          {user ? (
            <div className="flex pl-2 items-center">
              <div className="bg-[#4360ac] text-white rounded-full h-10 w-10 flex items-center justify-center">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-[#4360ac] to-[#2bace2] hover:scale-105 hover:from-[#2bace2] hover:to-[#4360ac] transition-all duration-300 ease-in-out  text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-24"
            >
              LOGIN
            </button>
          )}
          {/* <button
            type="button"
            onClick={() => navigate("/login")}
            class="text-white  bg-[#e64833] hover:bg-[#e64833] focus:ring-1 focus:ring-[#e64833] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-24 dark:bg-[#e64833] dark:hover:bg-[#e64833] focus:outline-none dark:focus:ring-[#e64833]"
          >
            LOGIN
          </button> */}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { NavbarLinks } from "../Data/Navbar";
import { useSelector } from "react-redux";
import { useLocation, matchPath } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { TbTriangleFilled } from "react-icons/tb";
import { setToken } from "../redux/slices/authSlice";
import { apiConnector } from "../service/apiconnector";
import { categories } from "../service/apis";

const Navbar = () => {
  const { token, expiryTime } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const loaction = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const dispatch = useDispatch()
  console.log(expiryTime < Date.now());
  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
      // console.log("Sub Links results : ", result.data.data);
    } catch (error) {
      console.log("Couldnot fetch categorie list data", error);
    }
  };
  useEffect(() => {
    fetchSublinks();
    // console.log(subLinks);
  }, []);

  if (Date.now() > localStorage.getItem("expiryTime")) {
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  }

  const matchRoute = (route) => {
    return matchPath({ path: route }, loaction.pathname);
  };

  return (
    <div className="text-[#DBDDEA] flex justify-between items-center px-20 py-3 border-b-[1px] border-richblack-700 bg-richblack-800 max-md:px-2">
      <div>
        <Link to={"/"}>
          <img src={logo} alt="" className="max-sm:scale-90" />
        </Link>
      </div>
      <div className="flex gap-7 max-sm:hidden">
        {NavbarLinks.map((item, index) => {
          return (
            <span key={index} className="cursor-pointer">
              {item.title == "Catalog" ? (
                <div className="group relative w-fit">
                  <div
                    className={`flex gap-2 items-center ${
                      matchRoute("/catalog/:name") ? "text-yellow-50" : ""
                    }`}
                  >
                    {item.title}
                    <IoIosArrowDown />
                  </div>
                  <div className="invisible group-hover:visible absolute">
                    <div className="-mb-1 pl-16">
                      <TbTriangleFilled className="scale-150 text-white" />
                    </div>
                    <div className="relative z-10 bg-white w-fit flex flex-col gap-2 border-transparent rounded-xl  text-black px-2 py-2 ">
                      {subLinks.map((subLink) => {
                        return (
                          <Link
                            key={subLink._id}
                            to={`/catalog/${subLink.name}`}
                            className="w-fit whitespace-nowrap hover:bg-slate-300 px-4 py-2 border-transparent rounded-xl"
                          >
                            {subLink.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={item.to}
                  className={`${matchRoute(item.to) ? "text-yellow-50" : ""}`}
                >
                  {item.title}
                </Link>
              )}
            </span>
          );
        })}
      </div>
      <div className="flex gap-4 items-center">
        <IoSearchOutline className="scale-125" />
        <IoCartOutline className="scale-125" />

        {expiryTime > Date.now() ? ()=>{dispatch(setToken)} : ""}

        {token ? (
          <Link to={"/dashboard/my-profile"}>
            <div className="w-8 h-8 ml-5 ">
              <img
                className="border-transparent rounded-full"
                src={`${user?.image}`}
                alt="image not found"
              />
            </div>
          </Link>
        ) : (
          <div className="flex gap-5 ml-5">
            <Link to={"/signup"}>
              <div className="px-2 py-1  rounded-lg border-[1px] border-richblack-700 shadow-sm shadow-white">
                SignUp
              </div>
            </Link>
            <Link to={"/login"}>
              <div className="px-2 py-1  rounded-lg border-[1px] border-richblack-700 shadow-sm shadow-white">
                LogIn
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

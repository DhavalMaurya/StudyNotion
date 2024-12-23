import React, { useState } from "react";
import logo from "../assets/logo.svg";
import FooterLinks from "../Data/FooterLinks";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";



const Footer = () => {
  const [footerData, setFooterData] = useState(FooterLinks);

  return (
    <div className="bg-richblack-800">
    <div className=" py-12 px-28 flex justify-between max-sm:px-5 ">
      <div className="Left flex gap-10 w-[50%] justify-between pr-20 max-sm:justify-center max-sm:w-fit">
        <div className="">
          <img src={logo} alt="" />
          <div className="mt-5">
            <span className="text-white">Company</span>
            <div className="mt-3 text-gray-500 text-sm flex flex-col gap-2">
              <span>About</span>
              <span>Carrer</span>
              <span>Affiliates</span>
            </div>
          </div>
          <div className="text-richblack-200 flex gap-4 mt-5 text-lg cursor-pointer">
            <FaFacebook/>
            <FaInstagram />
            <FaYoutube/>
            <FaGoogle />
          </div>
        </div>

        <div>
          <div className="">
            <span className="text-white">Resources</span>
            <div className="mt-3 text-gray-500 text-sm flex flex-col gap-2">
              <span>Articles</span>
              <span>Blog</span>
              <span>Chart Sheet</span>
              <span>Code challenges</span>
              <span>Docs</span>
              <span>Projects</span>
              <span>Videos</span>
              <span>Workspaces</span>
            </div>
          </div>

          <div className="mt-10">
            <span className="text-white">Support</span>
            <div className="mt-3 text-gray-500 text-sm flex flex-col gap-2">
              <span>Help Center</span>
            </div>
          </div>
        </div>

        <div>
          <div className="">
            <span className="text-white">Plans</span>
            <div className="mt-3 text-gray-500 text-sm flex flex-col gap-2">
              <span>A Paid memberships</span>
              <span>For students</span>
              <span>Business solutions </span>
            </div>
          </div>

          <div className="mt-10">
            <span className="text-white">Community</span>
            <div className="mt-3 text-gray-500 text-sm flex flex-col gap-2">
              <span>Forums</span>
              <span>Chapters</span>
              <span>Events</span>
            </div>
          </div>
        </div>
      </div>
      <div className="Right flex w-[50%] justify-between border-l-2 border-gray-800 pl-20 max-sm:hidden">
        {footerData.map((item,index) => {
          return (
            <div className="mt-5" key={index}>
              <span className="text-white">{item.tag}</span>
              <div className="mt-3 text-gray-500 text-sm flex flex-col gap-2">
              {item.links.map((element,index) => {
                return (
                    <span key={index}>{element.title}</span>
                );
            })}
            </div>
            </div>
          );
        })}
      </div>
    </div>
    <div className="flex justify-between mx-20 border-t border-t-gray-800 pb-10 text-gray-500 py-4 ">
      <div className="flex gap-3">
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
        <span>Terms</span>
      </div>
      <div>
        Made with ❤️ CodeHelp © 2024 StudyNotion
      </div>
    </div>
    </div>
  );
};

export default Footer;

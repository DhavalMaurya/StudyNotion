import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { getSubsectionDetail } from "../../../service/operations/courseAPI";
import { useSelector } from "react-redux";
const CourseVideo = () => {
    const {subSectionId} = useParams();
    const {token} = useSelector((state)=>state.auth)
    const [subSection , setSubSection] = useState(null);
    const fetchSubsection = async ()=>{
        try {
            const result = await getSubsectionDetail(subSectionId , token);
            console.log("video " ,result);
            setSubSection(result)
        } catch (error) {
         console.log(error);   
        }
    }
    
    useEffect(()=>{
        fetchSubsection();
    },[subSectionId])
  return (
    <div className="text-white w-[75%]">
      <div className="top-0 flex items-center justify-center">
        <ReactPlayer
          url={subSection?.videoUrl}
          controls
          width={"1000px"}
          height={"700px"}
        />
      </div>
    </div>
  );
};

export default CourseVideo;

import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValue,
}) => {
  const [chips, setChips] = useState([]);
  const {editCourse ,course } = useSelector((state)=>state.course)
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chip = event.target.value.trim();
      setChips([...chips, chip]);
      event.target.value = "";
    }
  };

  const handleRemove = (index) => {
    const newChip = chips.filter((_, i) => i !== index);
    setChips(newChip);
    console.log("chip removed");
  };

  useEffect(() => {
    // console.log(chips);
  }, [setChips]);

  useEffect(() => {
    setValue(name, chips);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips ,setChips]);
  
  useEffect(()=>{
    if(editCourse) {
      setChips(JSON.parse(course?.Tags))
    }
    register(`${name}[]`);
  },[])

  return (
    <div className="CourseTags flex flex-col gap-2">
      <label htmlFor="courseTitle" className="text-sm tracking-wide">
        {label}
        <span className="text-red-700">*</span>
      </label>
      <div className="tags flex flex-wrap gap-3">
        {chips?.map((item, idx) => {
          return (
            <div key={idx} className="bg-yellow-500 text-white px-2 py-1 rounded-3xl flex justify-center items-center gap-1">
              {item}
              <span
                onClick={() => {
                  handleRemove(idx);
                }}
                className="cursor-pointer"
              >
                <RxCross2 />
              </span>
            </div>
          );
        })}
      </div>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        className="bg-richblack-700 p-2 w-full border-transparent rounded-lg shadow-sm shadow-white"
        onKeyDown={handleKeyDown}
       
      />

      {errors[name] && <span>{label} is required</span>}
      {/* {errors.courseTitle && <span> Course title is required</span>} */}
    </div>
  );
};

export default ChipInput;

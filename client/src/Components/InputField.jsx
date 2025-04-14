import React from "react";

const InputField = ({label , type , name , value , changeFunc , placeholder ,  }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">
        {label} <span className="text-red-700">*</span>
      </label>
      <input
        type={type}
        className=" bg-richblack-800 p-2 border-transparent rounded-lg"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={changeFunc}
      />
    </div>
  );
};

export default InputField;

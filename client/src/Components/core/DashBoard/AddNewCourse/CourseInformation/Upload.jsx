import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { LuUploadCloud } from "react-icons/lu";

const Upload = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValue,
  editData = null,
  video = false,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(editData ? editData : "");

  const previewFile = (file) => {
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    previewFile(file)
    setSelectedFile(file);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  useEffect(() => {
    register(name, { require: true });
  });

  return (
    <div className="text-white flex flex-col gap-2">
      <label htmlFor="courseThumnail" className="text-sm tracking-wide">
        {label} <span className="text-red-700">*</span>
      </label>
      {previewSource ? (
        <div className="flex w-full flex-col p-6">
          {!video ? (
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <div className="text-center text-yellow-5 ">
              Video uploaded successfully
            </div>
          )}
          {selectedFile && (
            <button
              type="button"
              onClick={() => {
                setPreviewSource("");
                setSelectedFile(null);
                setValue(name, null);
              }}
              className="mt-3 text-richblack-400 underline"
            >
              Cancel
            </button>
          )}
        </div>
      ) : (
        <section className="bg-richblack-900 w-auto h-56  border-richblack-200 border-2 rounded-xl border-dotted flex justify-center items-center text-richblack-200">
          <div
            {...getRootProps({ className: "dropzone" })}
            className="flex flex-col items-center"
          >
            <input {...getInputProps()} name={name} id={name} />
            <div
              className={
                "p-4 border-transparent rounded-full bg-richblack-800 w-fit"
              }
            >
              <LuUploadCloud className="text-yellow-50" />
            </div>
            <p className="w-[70%] text-center">
              Drag and drop an image, or click to
              <span className="text-yellow-50 font-bold">Browse</span> a file
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Upload;

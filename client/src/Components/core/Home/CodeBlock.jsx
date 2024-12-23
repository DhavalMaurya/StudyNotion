import React from "react";
import Button from "./button";
import { TypeAnimation } from "react-type-animation";

const CodeBlock = ({
  position,
  heading,
  subHeading,
  button1,
  button2,
  code,
}) => {
  return (
    <div
      className={`w-full p-2 mt-32 flex ${position} gap-36 max-lg:flex-col max-sm:text-xl`}
    >
      <div className="w-[50%] max-lg:w-fit">
        <h1 className="text-4xl font-semibold max-sm:text-2xl">{heading}</h1>
        <p className="mt-5 text-sm w-[80%]">{subHeading}</p>
        <div className="mt-16 flex gap-10 max-md:gap-5 max-md:text-sm">
          <Button active={button1.active}>{button1.text}</Button>
          <Button active={button2.active}>{button2.text}</Button>
        </div>
      </div>
      <div
        className="Code text-sm flex gap-3 w-[50%] border h-fit p-2 bg-richblack-800 max-lg:w-full
    max-sm:text-xs"
      >
        <div className="text-center">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div className=" w-full text-richblack-25  font-semibold">
          <TypeAnimation
            className=""
            sequence={[
              `<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`,
              1000,
              "",
            ]}
            cursor={true}
            repeat={Infinity}
            speed={75}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;

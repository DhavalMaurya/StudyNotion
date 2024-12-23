import React, { useState } from "react";
import HighlitedText from "./HighlitedText";
import Card from "./Card";
import cardData from "../../../Data/CardData"

const CardSection = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const changeTab = (element) => {
    setCurrentTab(element);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="text-4xl font-bold max-md:text-3xl max-md:flex-col flex flex-row gap-2">
       <span> Unlock the </span><HighlitedText>Power of Code</HighlitedText>{" "}
      </div>
      <div className="text-sm mb-10">
        Learn to Build Anything You Can Imagine
      </div>
      <div className="flex items-center bg-richblack-800 border-2  border-transparent rounded-3xl mb-20 max-sm:scale-75 max-sm:text-xs">
        {cardData.map((element) => {
          return (
            <span
              key={element.id}
              onClick={() => {
                changeTab(element.id);
              }}
              className={`cursor-pointer px-5 py-1  border-2  border-transparent rounded-3xl transition-all duration-200 hover:scale-105 hover:bg-richblack-900 ${
                currentTab === element.id
                  ? "font-bold text-white bg-richblack-900"
                  : ""
              }`}
            >
              {element.title}
            </span>
          );
        })}
      </div>
      <div className="h-auto flex gap-16 justify-center -mb-16 z-10 max-md:flex-col">
        {cardData.map((element) => {
          if(element.id == currentTab){
            return (
                element.cards.map((card)=>(
                  <Card key={card.id} heading={card.heading} description={card.description} color={true} />
                ))
            )}
          }
        )}
      </div>
    </div>
  );
};

export default CardSection;

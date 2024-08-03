import React, { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./style.css";
import { useDispatch } from "react-redux";
import { setCategory } from "../utilis/AppSlice";

function ButtonsList() {
  const buttonsList = [
    "All",
    "Javascript",
    "Java",
    "Music",
    "Live",
    "Video",
    "Songs",
    "Vlogs",
    "Pakistani Dramas",
    "Software Development",
    "Git",
    "Wordpress",
    "Python",
    "Google",
    "Games",
  ];

  const [active, setActive] = useState("All");
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    }
  };

  const videoByTag = (tag) => {
    if (active !== tag) {
      setActive(tag);
      dispatch(setCategory(tag));
    }
  };
  // console.log(active);

  return (
    <div className="flex items-center pb-3 shadow-md">
      <button onClick={scrollLeft} className="mr-2">
        <FaArrowLeft />
      </button>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-2 hide-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {buttonsList.map((item, index) => {
          return (
            <button
              onClick={() => videoByTag(item)}
              key={index}
              className={`${
                active == item ? "bg-black text-white" : "bg-gray-bg"
              } w-fit px-4 py-1 rounded-lg mx-1 font-medium whitespace-nowrap`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <button onClick={scrollRight} className="ml-2">
        <FaArrowRight />
      </button>
    </div>
  );
}

export default ButtonsList;

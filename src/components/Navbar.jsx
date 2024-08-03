import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
import Avatar from "react-avatar";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { IoMic } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setCategory, toggleOpen } from "../utilis/AppSlice";
import axios from "axios";
import { YOUTUBE_SUGGESTION_API } from "../constant/Youtube";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);

  const searchVideo = () => {
    dispatch(setCategory(input));
    setInput("");
  };

  const showSuggestion = async () => {
    if (input) {
      try {
        const res = await axios.get(`${YOUTUBE_SUGGESTION_API}${input}`);
        setSuggestions(res.data[1]); // The suggestions are typically in the second element of the response array
      } catch (error) {
        console.log(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleClick = () => {
    dispatch(toggleOpen());
  };

  useEffect(() => {
    showSuggestion();
  }, [input]);

  return (
    <div className="flex items-center justify-between px-7 py-3 sticky top-0 w-[98%] bg-white">
      <div className="flex items-center ">
        <GiHamburgerMenu
          onClick={handleClick}
          size="24px"
          className="cursor-pointer hidden lg:block"
        />
        <img
          className="w-[115px] p-4 cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png"
          alt="yt_logo"
        />
      </div>
      {/* <div className="flex items-center w-[40%] relative">
        <div
          className={`w-[100%] px-2 ${
            isFocused ? "px-8" : ""
          } py-[6px] border outline-blue outline-2 border-gray-500 rounded-l-full relative`}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search"
            className="outline-none px-2 w-full"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {isFocused && (
            <IoSearchOutline
              size="20px"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 "
            />
          )}
        </div>
        <button
          onClick={searchVideo}
          className="border border-gray-400 bg-gray-100 rounded-r-full px-4 py-[6px]"
        >
          <IoSearchOutline size="24px" className="cursor-pointer" />
        </button>

        <IoMic
          size="34px"
          className="bg-[#E5E5E5] rounded-full mx-5 p-2 text-4xl hidden md:block"
          style={{ width: "34px", height: "34px" }}
        />
        {isFocused && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 mt-1 rounded-md max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div className="flex items-center gap-2 hover:bg-gray-100 px-3">
                <IoSearchOutline size="24px" className="cursor-pointer" />

                <li
                  key={index}
                  className="px-4 py-2  cursor-pointer"
                  onMouseDown={() => {
                    dispatch(setCategory(suggestion));
                    setInput("");
                  }}
                >
                  {suggestion}
                </li>
              </div>
            ))}
          </ul>
        )}
      </div> */}

      {/* ---------------------- */}

      {/* Search Icon for Small Screens */}
      {!showSearch && (
        <IoSearchOutline
          size="24px"
          className="cursor-pointer md:hidden"
          onClick={() => setShowSearch(true)}
        />
      )}

      {/* Search Field */}
      <div
        className={`flex items-center w-full md:w-[40%] relative ${
          showSearch ? "block" : "hidden md:flex"
        }`}
      >
        <div
          className={`w-[100%] px-2 ${
            isFocused ? "px-8" : ""
          } py-[6px] border outline-blue outline-2 border-gray-500 rounded-l-full relative`}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search"
            className="outline-none px-2 w-full"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {isFocused && (
            <IoSearchOutline
              size="20px"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          )}
        </div>
        <button
          onClick={searchVideo}
          className="border border-gray-400 bg-gray-100 rounded-r-full px-4 py-[6px]"
        >
          <IoSearchOutline size="24px" className="cursor-pointer" />
        </button>
        <IoClose
          size="24px"
          className="cursor-pointer md:hidden ml-2"
          onClick={() => setShowSearch(false)}
        />
        {isFocused && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 mt-1 rounded-md max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div className="flex items-center gap-2 hover:bg-gray-100 px-3">
                <IoSearchOutline size="24px" className="cursor-pointer" />
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer"
                  onMouseDown={() => {
                    dispatch(setCategory(suggestion));
                    setInput("");
                  }}
                >
                  {suggestion}
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>

      {/* ---------------------- */}

      <div className=" items-center gap-3 hidden md:flex">
        <IoIosNotificationsOutline size="24px" className="cursor-pointer" />
        <CiVideoOn size="24px" className="cursor-pointer" />
        <Avatar
          className="cursor-pointer"
          src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
          size={30}
          round={true}
        />
      </div>
    </div>
  );
}

export default Navbar;

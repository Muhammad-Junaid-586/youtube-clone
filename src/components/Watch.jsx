import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_VIDEO_DETAILS_API } from "../constant/Youtube";
import Avatar from "react-avatar";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import LiveChat from "./LiveChat";
import { useDispatch } from "react-redux";
import { setMessage } from "../utilis/ChatSlice";
import { useSelector } from "react-redux";
import { getApiKey } from "../constant/Api";

function Watch() {
  const API_KEY = getApiKey();
  const open = useSelector((store) => store.app.open);
  const [singleVideo, setSingleVideo] = useState(null);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [showMenu, setShowMenu] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, Math.ceil(maxLength / 2)) + "...";
    }
    return text;
  };

  const getSingleVideo = async (videoId) => {
    try {
      const res = await axios.get(
        `${YOUTUBE_VIDEO_DETAILS_API}?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
      );
      const resData = res.data.items[0];
      setSingleVideo(resData);
      console.log(resData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (videoId) {
      getSingleVideo(videoId);
    }
  }, [videoId]);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const sendMsg = () => {
    dispatch(
      setMessage({
        name: "Junaid boghdadi",
        message: input,
      })
    );
    setInput(" ");
  };
  return (
    <div className="flex w-[100%] gap-3 mx-3 lg:mx-0">
      <div
        className={`w-[95%] mx-auto ${
          open ? "lg:w-[calc(100%-28%)]" : "lg:w-[calc(100%-23%)]"
        } `}
      >
        <div>
          <iframe
            className="rounded-xl h-80 lg:h-[400px]"
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}?si=5pL1q_sLujNA8Vbv&autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {singleVideo && (
          <div>
            <h1 className="font-bold text-xl mt-2">
              {singleVideo.snippet.title}
            </h1>
            <div className="flex justify-between  items-center flex-col lg:flex-row w-full mt-2">
              <div className="flex gap-2 items-center justify-between lg:justify-normal w-full">
                <div className="flex">
                  <Avatar
                    className="cursor-pointer"
                    src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
                    size={30}
                    round={true}
                  />
                  <p className="font-bold">
                    {truncateText(singleVideo.snippet.channelTitle, 20)}
                  </p>
                </div>
                <button className="px-3 py-1 bg-black text-white rounded-full font-bold ">
                  Subscribe
                </button>
              </div>

              <div className="flex items-center justify-start lg:justify-end w-full lg:w-[50%] mt-3 lg:mt-0">
                <div className="flex items-center justify-between gap-1 bg-gray-bg px-4 py-1 rounded-full ">
                  <div className="flex items-center gap-1 px-2 text-xl cursor-pointer">
                    <AiOutlineLike />
                    <p>{singleVideo.statistics.likeCount}</p>
                  </div>
                  <div className="flex items-center text-xl gap-1 px-2 border-l-[1px] border-black cursor-pointer">
                    <AiOutlineDislike />
                    <p>{singleVideo.statistics.dislikeCount}</p>
                  </div>
                </div>
                <div className="flex items-center text-xl gap-1 ml-1 bg-gray-bg px-4 py-1 rounded-full cursor-pointer">
                  <RiShareForwardLine />
                  <p>Share</p>
                </div>
                <div className="relative ml-1">
                  <button
                    className=" bg-gray-bg px-2 py-1 rounded-full text-xl"
                    onClick={handleMenuToggle}
                  >
                    <BsThreeDots />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded-lg z-10">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                        Download
                      </button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                        Save
                      </button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                        Clip
                      </button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                        Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`${
          open ? "w-[28%)]" : "w-[23%)]"
        } border border-gray-400 rounded-lg h-fit mt-[2px] p-3 mr-2 hidden md:block mb-96`}
      >
        <div className="flex items-center justify-between">
          <h1>Top Chat</h1>
          <BsThreeDotsVertical />
        </div>
        <div className="overflow-y-auto h-[25rem] flex flex-col-reverse">
          <LiveChat />
        </div>

        {/* ====== for comments ======== */}
        <div className="border-t p-2 ">
          <div className="flex justify-between items-center w-[90%] mx-auto">
            <div>
              <Avatar
                className="cursor-pointer"
                src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
                size={30}
                round={true}
              />
            </div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border-b border-gray-300 outline-none"
              type="text"
              placeholder="Type Your Comment..."
            />
            <div className="bg-gray-bg p-2 rounded-full cursor-pointer">
              <LuSendHorizonal onClick={sendMsg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watch;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { getApiKey } from "../constant/Api";

function VideoCard({ item }) {
  const API_KEY = getApiKey();
  const [ytIcon, setYtIcon] = useState("");
  const getYoutubeChannelName = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${item.snippet.channelId}&key=${API_KEY}`
      );

      setYtIcon(response.data.items[0].snippet.thumbnails.high.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getYoutubeChannelName();
  }, []);

  return (
    <div className="w-[80%] mx-auto sm:w-full my-2  cursor-pointer">
      <img
        className=" rounded-xl"
        src={item.snippet.thumbnails.high.url}
        alt="Ytthambnail"
      />

      <div className="">
        <div className="flex mt-2 gap-2 ">
          <div className="w-[10%] h-[10%]">
            <Avatar
              className="cursor-pointer "
              src={ytIcon}
              size={35}
              round={true}
            />
          </div>
          <div className="ml-2">
            <h1 className="font-bold">{item.snippet.title}</h1>
            <p className="text-sm text-gray-500">{item.snippet.channelTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { YOUTUBE_VIDEO_API } from "../constant/Youtube";
import { getApiKey } from "../constant/Api";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideos } from "../utilis/AppSlice";
import "./style.css";

function VideosContainer() {
  const API_KEY = getApiKey();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { videos, category } = useSelector((store) => store.app);

  const fetchYoutubeVideo = async () => {
    try {
      const response = await axios.get(`${YOUTUBE_VIDEO_API}&key=${API_KEY}`);
      dispatch(setHomeVideos(response.data.items));
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const fetchVideoByCategory = async () => {
    try {
      const res = await axios.get(
        `${YOUTUBE_VIDEO_API}?part=snippet&type=video&q=${category}&maxResults=59&key=${API_KEY}`
      );
      dispatch(setHomeVideos(res.data.items));
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (category === "All") {
      fetchYoutubeVideo();
    } else {
      fetchVideoByCategory();
    }
  }, [category]);

  return (
    <div className="video-container hide-scrollbar md:mx-2 lg:mx-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {videos.map((item) => (
          <Link to={`/watch?v=${item.id.videoId}`} key={item.id.videoId}>
            <VideoCard item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VideosContainer;

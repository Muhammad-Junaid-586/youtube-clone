import React from "react";
import ButtonsList from "./ButtonsList";
import VideosContainer from "./VideosContainer";
import { useSelector } from "react-redux";

function Feed() {
  const open = useSelector((store) => store.app.open);
  return (
    <div
      className={`w-full ${
        open ? "lg:w-[calc(100%-21%)]" : "lg:w-[calc(100%-11%)]"
      } md:mr-4 mx-auto`}
    >
      <ButtonsList />
      <VideosContainer />
    </div>
  );
}

export default Feed;

import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleOpen } from "../utilis/AppSlice";
import { PiImagesLight } from "react-icons/pi";
import { CgPlayList } from "react-icons/cg";
import { MdHistory } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";
import { GrLike } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinedFlag } from "react-icons/md";
import { MdOutlineHelpOutline } from "react-icons/md";
import { MdOutlineFeedback } from "react-icons/md";

function Sidebar() {
  const open = useSelector((store) => store.app.open);
  const dispatch = useDispatch();

  const sideBarItems = [
    {
      icon: <IoHomeOutline size="24px" />,
      title: "Home",
    },
    {
      icon: <SiYoutubeshorts size="24px" />,
      title: "Short",
    },
    {
      icon: <MdOutlineSubscriptions size="24px" />,
      title: "Subscription",
    },
  ];

  const sideBarItemsYou = [
    {
      icon: <PiImagesLight size="24px" />,
      title: "Your Channel",
    },
    {
      icon: <MdHistory size="24px" />,
      title: "History",
    },
    {
      icon: <CgPlayList size="24px" />,
      title: "Playlist",
    },
    {
      icon: <RiVideoLine size="24px" />,
      title: "Your Videos",
    },
    {
      icon: <MdOutlineWatchLater size="24px" />,
      title: "Watch Later",
    },
    {
      icon: <GrLike size="24px" />,
      title: "Liked Videos",
    },

    ,
    // ===============
    {
      icon: <IoSettingsOutline size="24px" />,
      title: "Settings",
    },
    {
      icon: <MdOutlinedFlag size="24px" />,
      title: "Report History",
    },
    {
      icon: <MdOutlineHelpOutline size="24px" />,
      title: "Help",
    },
    {
      icon: <MdOutlineFeedback size="24px" />,
      title: "See FeedBack",
    },

    // ==========
  ];

  return (
    <div
      className={`fixed bottom-0 w-full bg-white lg:w-[21%] md:pl-5 lg:relative lg:overflow-y-scroll lg:h-[calc(100vh-4.625rem)] z-50`}
    >
      <div className="flex justify-around lg:flex-col lg:block mb-0 lg:mb-3">
        {sideBarItems.map((items, index) => (
          <div
            key={index}
            className={`flex items-center justify-center lg:justify-start gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-bg`}
          >
            <div>{items.icon}</div>
            {open && <div className="hidden lg:block">{items.title}</div>}
          </div>
        ))}
      </div>

      <div className=" justify-around lg:flex-col hidden   md:mt-0 lg:flex border-t-2 mt-4">
        <h1 className="mt-2 ml-3 font-bold">
          You <span className=" ml-2">&gt;</span>
        </h1>

        {sideBarItemsYou.map((items, index) => (
          <div
            key={index}
            className={`flex items-center justify-center lg:justify-start gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-bg`}
          >
            <div>{items.icon}</div>
            {open && <div className="hidden lg:block">{items.title}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

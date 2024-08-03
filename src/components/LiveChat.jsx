import React, { useEffect } from "react";
import ChatMsg from "./ChatMsg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessage } from "../utilis/ChatSlice";
import { randomComment, randomName } from "../utilis/Helper";

const LiveChat = () => {
  const message = useSelector((store) => store.chat.message);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(
        setMessage({
          name: randomName(),
          message: randomComment(),
        })
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="px-4 py-1">
      <div>
        {message.map((item, ind) => {
          return <ChatMsg key={ind} item={item} />;
        })}
      </div>
    </div>
  );
};

export default LiveChat;

import React from "react";
import Avatar from "react-avatar";

const ChatMsg = ({ item }) => {
  return (
    <div className="flex  gap-2">
      <div>
        <Avatar
          className="cursor-pointer"
          src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
          size={30}
          round={true}
        />
      </div>
      <div className="">
        <h1 className=" font-bold text-sm mt-[4px]">{item.name}</h1>
        <p className="py-2 text-sm">{item.message}</p>
      </div>
    </div>
  );
};

export default ChatMsg;

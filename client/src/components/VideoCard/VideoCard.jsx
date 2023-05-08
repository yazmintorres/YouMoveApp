import React from "react";

const VideoCard = ({ videoId, title, channelTitle, children }) => {
  return (
    <div className="order-2 shadow-sm">
      <div className="order-2  flex  flex-col   ">
        <iframe
          className="border-2 border-solid border-black
        "
          src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
          title={`A workout video by ${channelTitle} titled ${title} `}
          // width={320}
          // height={180}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        {children}
        <h3 className="m-0 mt-1 text-lg">{title}</h3>
        <p className="text-sm font-bold">{channelTitle}</p>
      </div>
    </div>
  );
};

export default VideoCard;

import React from "react";

const VideoCard = ({ videoId, title, channelTitle }) => {
  return (
    <div className="flex flex-col gap-1">
      <iframe
        className="border-2 border-solid border-black
        "
        src={`https://www.youtube.com/embed/${videoId}`}
        title={`A workout video by ${channelTitle} titled ${title} `}
        // width={320}
        // height={180}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h3 className="m-0 text-lg">{title}</h3>
      <p>{channelTitle}</p>
    </div>
  );
};

export default VideoCard;

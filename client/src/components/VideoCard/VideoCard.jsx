import React from "react";

const VideoCard = ({ sourceId, title, channel }) => {
  return (
    <div className="flex flex-col gap-1">
      <iframe
        className="border-2 border-solid border-black
        "
        src={`https://www.youtube.com/embed/${sourceId}`}
        title={`A workout video by ${channel} titled ${title} `}
        // width={560}
        // height={315}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h3 className="text-2xl">Title of Video</h3>
      <p>Channel name</p>
    </div>
  );
};

export default VideoCard;

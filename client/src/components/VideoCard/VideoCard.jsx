import React from "react";

const VideoCard = ({
  videoId,
  title,
  channelTitle,
  children,
  thumbnailUrl,
}) => {
  return (
    <div className="order-2 shadow-sm">
      <div className="order-2  flex  flex-col  md:m-auto  md:w-11/12  ">
        {videoId && (
          <iframe
            className="border-2 border-solid border-black 
          "
            src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
            title="a workout thumbnail"
            // width={320}
            // height={180}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="a workout thumbnail"
            className="border-2 border-solid  border-black
        "
          />
        )}
        {children}
        <h3 className="m-0 mt-1 text-lg">{title}</h3>
        <p className="text-sm font-bold">{channelTitle}</p>
      </div>
    </div>
  );
};

export default VideoCard;

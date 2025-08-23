import React from "react";

interface VideoViewerProps {
  uri: string;
  name: string;
}

const VideoViewer = ({ uri, name }: VideoViewerProps) => {
  return (
    <div className="flex w-full items-center justify-center bg-black p-4">
      <video
        controls
        className="max-h-screen max-w-full"
        style={{ maxHeight: "90vh" }}
      >
        <source src={uri} type={`video/${uri.split(".").pop()}`} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoViewer;

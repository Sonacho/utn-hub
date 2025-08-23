import React from "react";

interface AudioViewerProps {
  uri: string;
  name: string;
}

const AudioViewer = ({ uri, name }: AudioViewerProps) => {
  return (
    <div className="flex w-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-center text-lg font-semibold">{name}</h3>
        {/*         <audio controls className="w-full">
          <source src={uri} type={`audio/${uri.split(".").pop()}`} />
          Your browser does not support the audio element.
        </audio> */}
        <audio controls className="w-full" src={uri}></audio>
      </div>
    </div>
  );
};

export default AudioViewer;

import React from "react";

interface ImageViewerProps {
  uri: string;
  name: string;
}

const ImageViewer = ({ uri, name }: ImageViewerProps) => {
  return (
    <div className="flex w-full items-center justify-center bg-gray-100 p-4">
      <div className="max-h-screen max-w-full">
        <img
          src={uri}
          alt={name}
          className="max-h-screen max-w-full rounded-lg object-contain shadow-lg"
          style={{ maxHeight: "90vh" }}
        />
      </div>
    </div>
  );
};

export default ImageViewer;

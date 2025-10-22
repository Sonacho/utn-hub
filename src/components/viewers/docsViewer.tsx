import React from "react";

interface DocViewer {
  uri: string;
  name: string;
}

const docViewer = ({ uri, name }: DocViewer) => {
  return (
    <div className="w-full">
      <iframe
        key={uri}
        src={`https://docs.google.com/gview?url=${uri}&embedded=true`}
        className="h-screen w-full"
        name={name}
      />
    </div>
  );
};

export default docViewer;

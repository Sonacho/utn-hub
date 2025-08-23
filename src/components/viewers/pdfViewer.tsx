import React from "react";

interface PdfViewer {
  uri: string;
  name: string;
}

const pdfViewer = ({ uri, name }: PdfViewer) => {
  return (
    <div className="w-full">
      <iframe
        src={`https://docs.google.com/gview?url=${uri}&embedded=true`}
        className="h-screen w-full"
        name={name}
      />
    </div>
  );
};

export default pdfViewer;

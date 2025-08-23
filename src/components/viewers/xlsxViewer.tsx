import React from "react";

interface XlsxViewerProps {
  uri: string;
  name: string;
}

const XlsxViewer = ({ uri, name }: XlsxViewerProps) => {
  return (
    <div className="w-full">
      <iframe
        src={`https://view.officeapps.live.com/op/view.aspx?src=${uri}`}
        className="h-screen w-full"
        title={name}
      />
    </div>
  );
};

export default XlsxViewer;

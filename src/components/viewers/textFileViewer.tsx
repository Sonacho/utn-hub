"use client";
import React, { useState, useEffect } from "react";

interface TextFileViewerProps {
  uri: string;
  name: string;
}

const TextFileViewer = ({ uri, name }: TextFileViewerProps) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(uri);
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError("Failed to load file content");
      } finally {
        setLoading(false);
      }
    })();
  }, [uri]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="w-full bg-white p-4">
      <pre className="max-h-screen overflow-auto rounded-lg bg-gray-100 p-4">
        <code>{content}</code>
      </pre>
    </div>
  );
};

export default TextFileViewer;

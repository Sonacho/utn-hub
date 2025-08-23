import ZipViewer from "./zipViewer";
import DocsViewer from "./docsViewer";
import PdfViewer from "./pdfViewer";
import ImageViewer from "./imageViewer";
import XlsxViewer from "./xlsxViewer";
import TextFileViewer from "./textFileViewer";
import VideoViewer from "./videoViewer";
import AudioViewer from "./audioViewer";
import UnsupportedViewer from "./unsupportedViewer";

export const viewers: Record<
  string,
  React.FC<{ uri: string; name: string }>
> = {
  // Archive formats
  zip: ZipViewer,
  rar: UnsupportedViewer, // Consider adding RAR support
  "7z": UnsupportedViewer,
  tar: UnsupportedViewer,

  // Document formats
  pdf: PdfViewer,
  doc: DocsViewer,
  docx: DocsViewer,
  xls: XlsxViewer,
  xlsx: XlsxViewer,
  ppt: DocsViewer,
  pptx: DocsViewer,
  odt: XlsxViewer,
  csv: UnsupportedViewer,

  // Image formats
  jpg: ImageViewer,
  jpeg: ImageViewer,
  png: ImageViewer,
  gif: ImageViewer,
  bmp: ImageViewer,
  webp: ImageViewer,
  svg: ImageViewer,
  tiff: ImageViewer,

  // Text formats
  txt: TextFileViewer,
  json: TextFileViewer,
  xml: TextFileViewer,
  html: TextFileViewer,
  css: TextFileViewer,
  js: TextFileViewer,
  ts: TextFileViewer,

  // Video formats
  mp4: VideoViewer,
  webm: VideoViewer,
  mov: VideoViewer,
  avi: VideoViewer,
  mkv: VideoViewer,

  // Audio formats
  mp3: AudioViewer,
  wav: AudioViewer,
  ogg: AudioViewer,
  m4a: AudioViewer,
};

export const getViewer = (fileType: string) =>
  viewers[fileType.toLowerCase()] ?? UnsupportedViewer;

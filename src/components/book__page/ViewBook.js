import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";

export default function ViewBook(props) {
  const { pdfLink } = props;
  const viewerDiv = useRef(null);
  useEffect(() => {
    console.log("bookInfo" + [pdfLink]);
    WebViewer(
      {
        path: "/lib",
        initialDoc: pdfLink,
      },
      viewerDiv.current
    );
  }, []);
  return (
    <div className="webviewer" ref={viewerDiv}>
      {" "}
    </div>
  );
}

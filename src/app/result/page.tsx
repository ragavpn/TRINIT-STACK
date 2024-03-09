import React from "react";
import "./PageStyles.css";
import { Blob } from "../components/Blob/Blob";

import blob1 from "../../assets/blob1.svg";
import blob2 from "../../assets/blob2.svg";
import blob3 from "../../assets/blob3.svg";
import blob4 from "../../assets/blob4.svg";

export default function Home() {
  const blobs = [blob1, blob2, blob3, blob4, blob1];
  return (
    <div className="back">
      <div className="blobContainer">
        {blobs.map((blob) => {
          return (
            <Blob
              src={blob}
              key={blob}
              x={150 * Math.random()}
              y={150 * Math.random()}
            />
          );
        })}
      </div>
      <div className="foreground"></div>
    </div>
  );
}

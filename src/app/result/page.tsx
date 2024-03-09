"use client";
import React, { useState } from "react";
import "./PageStyles.css";
import { Blob } from "../components/Blob/Blob";

import blob1 from "../../assets/blob1.svg";
import blob2 from "../../assets/blob2.svg";
import blob3 from "../../assets/blob3.svg";
import blob4 from "../../assets/blob4.svg";
import { FancyCarousel } from "../components/carousel/Carousel";

export default function Home() {
  const blobs = [blob1, blob2, blob3, blob4, blob1];
  const [carousel, setCarousel] = useState({
    carouselOrietation: 0,
    elementOrientation: 0,
    focusElement: 0,
  });
  const rotateRight = () => {
    setCarousel({
      carouselOrietation: carousel.carouselOrietation + theta,
      elementOrientation: carousel.elementOrientation - theta,
      focusElement:
        carousel.focusElement < noOfImages - 1 ? carousel.focusElement + 1 : 0,
    });
  };

  const rotateLeft = () => {
    setCarousel({
      carouselOrietation: carousel.carouselOrietation - theta,
      elementOrientation: carousel.elementOrientation + theta,
      focusElement:
        carousel.focusElement > 0 ? carousel.focusElement - 1 : noOfImages - 1,
    });
  };

  const noOfImages: number = 5;
  const theta: number = 360 / noOfImages;
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
      <div className="foreground">
        <div className="carousel">
          <FancyCarousel
            images={Array(5).fill("/vercel.svg")}
            carousel={carousel}
            setCarousel={setCarousel}
          />
        </div>
        <button
          onClick={() => {
            rotateLeft();
          }}
        >
          d
        </button>
        <button
          onClick={() => {
            rotateRight();
          }}
        >
          e
        </button>
      </div>
    </div>
  );
}

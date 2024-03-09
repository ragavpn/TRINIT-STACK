"use client";
import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./PageStyles.css";
import { Blob } from "../components/Blob/Blob";

import blob1 from "../../assets/blob1.svg";
import blob2 from "../../assets/blob2.svg";
import blob3 from "../../assets/blob3.svg";
import blob4 from "../../assets/blob4.svg";

import some from "../../assets/some.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";

import { FancyCarousel } from "../components/carousel/Carousel";
import InfoCard from "../components/InfoCard/InfoCard";

export default function Home() {
  const blobs = [blob1, blob2, blob3, blob4, blob1];
  const [carousel, setCarousel] = useState({
    carouselOrietation: 0,
    elementOrientation: 0,
    focusElement: 0,
  });

  let arr = [
    {
      src: some,
      title: "Star Shaped Garden",
      description:
        "The image consists of a star shaped garden with a housing complex in the center",
    },
    {
      src: img2,
      title: "City With River",
      description:
        "The image consists of a city and a river that flows through it providing a scenic view",
    },
    {
      src: img3,
      title: "Beach in Sands",
      description:
        "The image consists of beach and the sands that are on the bay",
    },
    {
      src: img4,
      title: "Intersection of Roads",
      description:
        "The image consists of intersection of roads in a cosmopolitan city",
    },
    {
      src: img4,
      title: "Intersection of Roads",
      description:
        "The image consists of intersection of roads in a cosmopolitan city",
    },
  ];

  const noOfImages: number = arr.length;
  const theta: number = 360 / noOfImages;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const rotateLeft = useCallback(() => {
    setCarousel((prevCarousel) => ({
      carouselOrietation: prevCarousel.carouselOrietation - theta,
      elementOrientation: prevCarousel.elementOrientation + theta,
      focusElement:
        prevCarousel.focusElement > 0
          ? prevCarousel.focusElement - 1
          : noOfImages - 1,
    }));
  }, [setCarousel, theta, noOfImages]);

  const rotateRight = useCallback(() => {
    setCarousel((prevCarousel) => ({
      carouselOrietation: prevCarousel.carouselOrietation + theta,
      elementOrientation: prevCarousel.elementOrientation - theta,
      focusElement:
        prevCarousel.focusElement < noOfImages - 1
          ? prevCarousel.focusElement + 1
          : 0,
    }));
  }, [setCarousel, theta, noOfImages]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "ArrowLeft") {
        // Handle left arrow key press
        rotateLeft();
      } else if (event.key === "ArrowRight") {
        // Handle right arrow key press
        rotateRight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [carousel, rotateLeft, rotateRight]);

  const pathName = usePathname();

  return (
    <div className="back">
      <nav className="bar">
        <Link href="/home">
          {/* <button className={`home-button ${router.pathname.endsWith("/home") ? "active" : ""}`}> */}
          <button
            className={`home-button ${pathName.endsWith("/home") ? "active-button" : "inactive-button"}`}
          >
            <span>Home</span>
          </button>
          {/* Home */}
        </Link>

        <Link href="/profile">
          {/* <button className={`profile-button ${router.pathname.endsWith("/profile") ? "active" : ""}`}> */}
          <button
            className={`profile-button ${pathName.endsWith("/result") ? "active-button" : "inactive-button"}`}
          >
            <span>Profile</span>
          </button>
        </Link>
      </nav>

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
            images={arr}
            carousel={carousel}
            setCarousel={setCarousel}
          />
        </div>
        <div className="ui">
          <InfoCard className="info-card" item={arr[carousel.focusElement]} />
          <div className="nav">
            <button
              onClick={() => {
                rotateLeft();
              }}
            >
              <Image src={leftArrow} alt="left arrow" />
            </button>

            <div className="flex flex-row justify-around w-full">
              {arr.map((item) => {
                return (
                  <div
                    className={`w-[18%] flex flex-col items-center rounded-xl justify-around text-white p-2 ${arr.indexOf(item) === carousel.focusElement ? "bg-[rgba(52,59,82,0.57)]" : ""}`}
                    style={{ transition: "background 0.5s ease" }}
                    key={arr.indexOf(item)}
                  >
                    <Image width={120} src={item.src} alt="" />
                    <p className="text-sm w-[70%] text-center">{item.title}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                rotateRight();
              }}
            >
              <Image src={rightArrow} alt="rightarrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

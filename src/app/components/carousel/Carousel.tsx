"use client";

import React, { FC, useState, CSSProperties } from "react";
import "./carousel.css";
import Image from "next/image";
import InfoCard from "../InfoCard/InfoCard";
interface CarouselInfo {
  images: any;
  setFocusElement?: Function;
  offsetAngle?: number;
  carouselRadius?: number;
  centralImageRadius?: number;
  centralImageBoxShadow?: string;
  peripheralImageRadius?: number;
  peripheralImageBoxShadow?: string;
  focusElementStyling?: CSSProperties;
  border?: boolean;
  borderWidth?: number;
  borderHexColor?: string;
  autoRotateTime?: number;
  transitionTime?: number;
  navigationTextSize?: number;
  navigationButtonRadius?: number;
  navigationButtonBgColor?: string;
  navigationButtonColor?: string;
  navigationButtonStyling?: CSSProperties;
  carousel: any;
  setCarousel: Function;
}

export const FancyCarousel: FC<CarouselInfo> = ({
  images,
  setFocusElement = () => {},
  offsetAngle = 0,
  carouselRadius = 600,
  centralImageRadius = 0,
  centralImageBoxShadow = "",
  peripheralImageRadius = 180,
  peripheralImageBoxShadow = "",
  focusElementStyling = {},
  border = false,
  borderWidth = 5,
  borderHexColor = "CB786C",
  autoRotateTime = 0,
  transitionTime = 1.5,
  navigationTextSize = 2,
  navigationButtonRadius = 32.5,
  navigationButtonBgColor = "CB786C",
  navigationButtonColor = "FFFFFF",
  navigationButtonStyling = {},
  carousel = [],
  setCarousel = () => {},
}: CarouselInfo) => {
  setFocusElement(carousel.focusElement);

  const noOfImages: number = images.length;
  const theta: number = 360 / noOfImages;

  const borderElement: string = border
    ? `url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'${carouselRadius * 2}\' ry=\'${carouselRadius * 2}\' stroke=\'%23${borderHexColor}FF\' stroke-width=\'${borderWidth}\' stroke-dasharray=\'6%2c 24\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")`
    : "";

  var newCoordinates: number[][] = [];
  //@ts-expect-error
  images.forEach((item, index) => {
    newCoordinates.push([
      carouselRadius -
        peripheralImageRadius +
        carouselRadius * Math.cos((2 * Math.PI * index) / noOfImages),
      carouselRadius -
        peripheralImageRadius +
        carouselRadius * Math.sin((2 * Math.PI * index) / noOfImages),
    ]);
  });

  // rotate point around (carouselRadius-peripheralRadius, carouselRadius-peripheralRadius) by (offset+90) deg
  const totalDeviation: number = (offsetAngle * Math.PI) / 180 + Math.PI / 2;

  var rotatedCoordinates: number[][] = [];
  const centerCoordinate: number = carouselRadius - peripheralImageRadius;
  newCoordinates.forEach((item, index) => {
    rotatedCoordinates.push([
      centerCoordinate +
        (item[0] - centerCoordinate) * Math.cos(totalDeviation) -
        (item[1] - centerCoordinate) * Math.sin(totalDeviation),
      centerCoordinate +
        (item[0] - centerCoordinate) * Math.sin(totalDeviation) +
        (item[1] - centerCoordinate) * Math.cos(totalDeviation),
    ]);
  });
  return (
    <div className="fancy-carousel-wrapper-element">
      <div
        className="fancy-carousel-border"
        style={{
          backgroundImage: borderElement,
          height: `${carouselRadius * 2}px`,
          width: `${carouselRadius * 2}px`,
          transition: `${transitionTime}`,
        }}
      >
        <div
          className="fancy-carousel"
          style={{
            transform: `rotate(${carousel.carouselOrietation}deg)`,
            height: `${carouselRadius * 2}px`,
            width: `${carouselRadius * 2}px`,
          }}
        >
          {/*@ts-expect-error*/}
          {images.map((item, index) =>
            index !== carousel.focusElement ? (
              <div
                className="fancy-carousel-element"
                key={index}
                style={{
                  transform: `rotate(${carousel.elementOrientation}deg)`,
                  width: `${peripheralImageRadius * 2}px`,
                  height: `${peripheralImageRadius * 2}px`,
                  left: `${rotatedCoordinates[index][0]}px`,
                  bottom: `${rotatedCoordinates[index][1]}px`,
                  boxShadow: `${peripheralImageBoxShadow}`,
                  transition: `${transitionTime}`,
                  border: "20px solid #565B6F",
                  borderRadius: "100%",
                  boxSizing: "content-box",
                }}
              >
                <Image
                  src={item.src}
                  width={`${peripheralImageRadius * 2}`}
                  height={`${peripheralImageRadius * 2}`}
                  alt={item}
                />
              </div>
            ) : (
              <div
                className="fancy-carousel-element"
                key={index}
                style={{
                  ...{
                    transform: `rotate(${carousel.elementOrientation}deg)`,
                    width: `${peripheralImageRadius * 2}px`,
                    height: `${peripheralImageRadius * 2}px`,
                    left: `${rotatedCoordinates[index][0]}px`,
                    bottom: `${rotatedCoordinates[index][1]}px`,
                    boxShadow: `${peripheralImageBoxShadow}`,
                    transition: `${transitionTime}`,
                  },
                  ...focusElementStyling,
                }}
              >
                <Image
                  src={item.src}
                  width={`${peripheralImageRadius * 2}`}
                  height={`${peripheralImageRadius * 2}`}
                  alt={item}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

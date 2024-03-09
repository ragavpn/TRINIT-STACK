"use client";
import Image from "next/image";
import "./styles.BlobStyles.css";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import nodeCrypto from "crypto";
export function Blob({ src, x, y }: { src: string; x: number; y: number }) {
  const [Position, setPosition] = useState({ x: x, y: y });

  useEffect(() => {
    const [height, width] = [window.innerHeight, window.innerWidth];
    let timer = setInterval(() => {
      setPosition({
        x: (width * Math.random() * (height * Math.random())) / height,
        y: (height * Math.random() * (width * Math.random())) / width,
      });
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [Position]);

  return (
    <motion.div
      className="blobContainer"
      animate={{
        x: Position.x,
        y: Position.y,
      }}
      transition={{
        type: "smooth",
        ease: "linear",
        duration: 3,
        repeat: Infinity,
      }}
    >
      <Image className="blob" src={src} alt={src} />
    </motion.div>
  );
}

"use client";
import React, { lazy } from "react";
import "./PageStyles.css";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Earth } from "./components/Earth";

export default function Home() {
  return (
    <div className="canvas-container">
      <Canvas>
        <ambientLight color="yellow" />
        <pointLight position={[0, -2220, -2010]} intensity={9000} />

        <OrbitControls />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}

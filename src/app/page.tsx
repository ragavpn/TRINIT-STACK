"use client";
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./PageStyles.css";
import { Suspense } from "react";
import { Earth } from "./components/Earth";
import { Bounds, useBounds, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "react-three-fiber";
import { Vector3 } from "three";

export default function Home() {
  let [rate, setRate] = useState(0.1);

  return (
    <div className="canvas-container">
      <Canvas>
        <OrbitControls autoRotate autoRotateSpeed={20 * rate} />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <SelectToZoom>
              <Earth rate={rate} />
            </SelectToZoom>
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}
//@ts-expect-error
function SelectToZoom({ children }) {
  const api = useBounds();
  return (
    <group
      onClick={(e) => (
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      )}
      onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  );
}

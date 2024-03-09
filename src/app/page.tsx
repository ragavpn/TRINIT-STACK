//@ts-nocheck
"use client";

import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./PageStyles.css";
import { Suspense } from "react";
import { Earth } from "./components/Earth";
import { Bounds, useBounds, OrbitControls } from "@react-three/drei";
import { useDropzone } from "react-dropzone";
import { useThree } from "react-three-fiber";
import { Camera } from "react-three-fiber";
export default function Home() {
  let [rate, setRate] = useState(0.2);
  let [margin, setMargin] = useState(1.2);
  let [camera, setCamera] = useState();

  function acceptDrop(files: File[], event: any) {
    setRate(4);
    setMargin(0.9);
    console.log(camera);
    camera.position.set(0, 2, -6);
    camera.lookAt(0, 10, 10);
    camera.rotation.z += Math.PI / 1.2;
    camera.rotation.y += Math.PI / 1.2;
    camera.fov /= 8;
    camera.updateProjectionMatrix();

    // fadeIn animation!
  }
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDropAccepted: acceptDrop,
  });
  const acceptedFileItems = acceptedFiles[0];

  return (
    <div className="container">
      <div className="bg"></div>
      <div {...getRootProps({ className: "fg" })}>
        <input {...getInputProps()} />
        <div className="canvas-container">
          <h1 className="drop-files">Drop Your Image Here</h1>
          <Canvas>
            <OrbitControls
              autoRotate
              autoRotateSpeed={20 * rate}
              enablePan={false}
              enableZoom={false}
            />
            <ambientLight />
            <Suspense fallback={null}>
              <Bounds fit clip observe margin={margin}>
                <SelectToZoom>
                  <Earth rate={rate} cam={camera} setCamera={setCamera} />
                </SelectToZoom>
              </Bounds>
            </Suspense>
          </Canvas>
        </div>
      </div>
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

//@ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Canvas } from "@react-three/fiber";
import "./PageStyles.css";
import { Suspense } from "react";
import { Earth } from "./components/Earth";
import { Bounds, useBounds, OrbitControls } from "@react-three/drei";
import { useDropzone } from "react-dropzone";
import { useThree } from "react-three-fiber";
import { Camera } from "react-three-fiber";
import fs from "fs";
export default function Home() {
  let [rate, setRate] = useState(0.2);
  let [margin, setMargin] = useState(1.2);
  let [camera, setCamera] = useState();

  const router = useRouter();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg"],
    },
    maxFiles: 10,
    onDropAccepted: acceptDrop,
  });

  const fileTypes = ["jpeg"];

  const fileToByteArray = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const [file, setFile] = useState();

  async function acceptDrop(files: File[], event: any) {
    let base64string = "";

    setRate(4);
    setMargin(0.9);
    console.log(files);
    console.log(camera);
    camera.position.set(0, 2, -6);
    camera.lookAt(0, 10, 10);
    camera.rotation.z += Math.PI / 1.2;
    camera.rotation.y += Math.PI / 1.2;
    camera.fov /= 8;
    camera.updateProjectionMatrix();

    // const byteArray = await fileToByteArray(files[0]);
    var reader = new FileReader();
    reader.onloadend = function () {
      base64string = reader.result;
      let fD = new FormData();
      fD.append("string", base64string);

      (async () => {
        const response = fetch(
          `/api/upload?binarystring=${encodeURIComponent("image")}`,
          {
            method: "POST",
            body: fD,
          },
        );

        const data = await (await response).json();
        let storedImages = [];
        if (window != undefined)
          storedImages =
            JSON.parse(window.localStorage.getItem("images")) || [];

        storedImages.push({
          src: base64string,
          title: data.caption,
        });

        if (window != undefined)
          window.localStorage.setItem("images", JSON.stringify(storedImages));
      })();
    };
    reader.readAsDataURL(files[0]);

    // var base64string = btoa(String.fromCharCode.apply(null, byteArray));
    // console.log(base64string);

    document.querySelector(".container")?.classList.add("fade-in");
    setTimeout(() => {
      router.push("/result");
    }, 1800);
  }

  return (
    <div className="container">
      <div className="bg"></div>
      <div {...getRootProps({ className: "fg" })}>
        <input {...getInputProps()} />
        <div className="canvas-container">
          <h1 className="group-name">ARAT</h1>
          <h1 className="event-name">TRINIT&#39;24</h1>
          <h1 className="instruction"> Drag your image onto the earth</h1>
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

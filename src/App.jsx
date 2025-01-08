import React, { useEffect, useState } from "react";
import "aframe";
import "@ar-js-org/ar.js";
import "./App.css";
import Toolbar from "./components/Toolbar";

function App() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [ambientIntensity, setAmbientIntensity] = useState(0.6);

  useEffect(() => {
    const video = document.querySelector("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Dynamically update lighting intensity based on camera feed
    function updateLighting() {
      // Check that there is a video feed and it is ready to be processed
      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video feed onto the canvas (to process every pixel)
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get the pixel data from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let totalBrightness = 0;

        // For every pixel, calculate the brightness and add it to the total
        for (let i = 0; i < data.length; i += 4) {
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          totalBrightness += brightness;
        }

        // Calculate the average brightness
        const avgBrightness = totalBrightness / (data.length / 4);

        // Normalize the brightness to a value between 0.3 and 1
        const normalizedIntensity = Math.min(1, Math.max(0.3, avgBrightness / 255));
        setAmbientIntensity(normalizedIntensity);
      }
      requestAnimationFrame(updateLighting);
    }

    updateLighting();
  }, []);

  useEffect(() => {
    if (selectedModel) {
      const entity = document.querySelector("[gltf-model]");
      entity.addEventListener("model-loaded", () => {
        const mesh = entity.getObject3D("mesh");
        if (mesh) {
          mesh.traverse((node) => {
            if (node.isMesh) {
              node.material.metalness = 0.5;
              node.material.roughness = 0.8;
            }
          });
        }
      });
    }
  }, [selectedModel]);

  return (
    <div className="app-container">
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; fit: true"
        gesture-detector
      >
        <a-camera position="0 1.6 0" fov="75" look-controls></a-camera>

        {/* Lighting */}
        <a-light type="ambient" intensity={ambientIntensity}></a-light>
        <a-light
          type="directional"
          position="1 4 -3"
          intensity={ambientIntensity}
          castShadow="true"
        ></a-light>
        <a-light
          type="point"
          position="0 3 2"
          intensity={ambientIntensity / 2}
        ></a-light>

        {/* Plano (Suelo) */}
        <a-plane
          position="0 0 0"
          rotation="-90 0 0"
          width="20"
          height="20"
          material="opacity: 0; transparent: true"
        ></a-plane>

        {/* Modelo seleccionado */}
        {selectedModel && (
          <a-entity
            gltf-model={selectedModel}
            position="0 0 -2"
            scale="0.5 0.5 0.5"
            class="clickable"
            material="shader: standard; color: white"
            gesture-handler="minScale: 0.25; maxScale: 5; rotationFactor: 10"
          ></a-entity>
        )}
      </a-scene>

      {/* Toolbar */}
      <Toolbar
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
    </div>
  );
}

export default App;

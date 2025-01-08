import React, { useEffect, useState } from "react";
import "aframe";
import "@ar-js-org/ar.js";
import "./App.css";
import Toolbar from "./components/Toolbar";

function App() {
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    console.log("AR.js with A-Frame loaded.");
  }, []);

  return (
    <div className="app-container">
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; fit: true"
        gesture-detector
      >
        {/* Camera */}
        <a-camera position="0 1.6 0" fov="75" look-controls></a-camera>

        {/* Lighting */}
        <a-light type="ambient" intensity="0.6"></a-light>
        <a-light
          type="directional"
          position="1 4 -3"
          intensity="1"
          castShadow="false"
        ></a-light>
        <a-light type="point" position="0 3 2" intensity="0.5"></a-light>

        {/* Ground Plane */}
        <a-plane
          position="0 0 0"
          rotation="-90 0 0"
          width="20"
          height="20"
          material="opacity: 0; transparent: true"
        ></a-plane>

        {/* Selected Model */}
        {selectedModel && (
          <a-entity
            gltf-model={selectedModel}
            position="0 0 -2"
            scale="0.5 0.5 0.5"
            class="clickable"
            gesture-handler="minScale: 0.25; maxScale: 5; rotationFactor: 10"
          ></a-entity>
        )}
      </a-scene>

      {/* Toolbar for Model Selection */}
      <Toolbar
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
    </div>
  );
}

export default App;

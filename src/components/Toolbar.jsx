import React from "react";
import "./Toolbar.css"; // Separate CSS for the toolbar

const models = [
    { id: "modern_coffee_table_01_4k", label: "Modern Coffee Table", thumbnail: "/model_thumbnails/modern_coffee_table_01.webp" },
    { id: "plastic_monobloc_chair_01_4k", label: "Plastic Monobloc Chair", thumbnail: "/model_thumbnails/plastic_monobloc_chair_01.webp" },
    { id: "steel_frame_shelves_01_4k", label: "Steel Frame Shelves (Type 1)", thumbnail: "/model_thumbnails/steel_frame_shelves_01.webp" },
    { id: "steel_frame_shelves_02_4k", label: "Steel Frame Shelves (Type 2)", thumbnail: "/model_thumbnails/steel_frame_shelves_02.webp" },
    { id: "wooden_display_shelves_01_4k", label: "Wooden Display Shelves", thumbnail: "/model_thumbnails/wooden_display_shelves_01.webp" },
    { id: "Ottoman_01_4k", label: "Ottoman", thumbnail: "/model_thumbnails/Ottoman_01.webp" },
    { id: "side_table_01_4k", label: "Side Table", thumbnail: "/model_thumbnails/side_table_01.webp" },
    { id: "outdoor_table_chair_set_01_4k", label: "Outdoor Table and Chair Set", thumbnail: "/model_thumbnails/outdoor_table_chair_set_01.webp" },
    { id: "wooden_picnic_table_4k", label: "Wooden Picnic Table", thumbnail: "/model_thumbnails/wooden_picnic_table.webp" },
];

function Toolbar({ selectedModel, setSelectedModel }) {
    return (
        <div className="toolbar">
            {models.map((model) => (
                <button
                    key={model.id}
                    className={`toolbar-button ${selectedModel === `/models/${model.id}.glb` ? "selected" : ""
                        }`}
                    onClick={() => {
                        console.log(`Selected model: /models/${model.id}.glb`);
                        setSelectedModel(`/models/${model.id}.glb`);
                    }}
                >
                    <img src={model.thumbnail} alt={model.label} className="thumbnail" />
                    <span className="label">{model.label}</span>
                </button>
            ))}
        </div>
    );
}

export default Toolbar;
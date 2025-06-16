import React from "react";

export const openWidget = (fallback) => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dphyecnpy",
        uploadPreset: "kwitansi",
        sources: ["local", "camera"],
        multiple: false,
        folder: "kwitansi"
      },
      (error, result) => {
        if (!error && result.event === "success") {
          console.log("Uploaded image:", result.info);
          if(fallback) {
            fallback(result.info);
          }
        }
      }
    );
  };

const CloudinaryUpload = ({ onUpload }) => {
  return <button onClick={openWidget}>Upload Image</button>;
};

export default CloudinaryUpload;

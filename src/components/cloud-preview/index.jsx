import { Image, CloudinaryContext } from "cloudinary-react";

function CloudPreview({publicId}) {
  return (
    <CloudinaryContext cloudName="dphyecnpy">
      <Image publicId={publicId} 
        // width="auto"
        crop="scale"
        quality="auto"
        dpr="auto" 
        style={{ width: "100%", height: "auto" }}
        />
    </CloudinaryContext>
  )
}

export default CloudPreview;
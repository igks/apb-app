import { Image, CloudinaryContext } from "cloudinary-react";

function CloudPreview({publicId}) {
  return (
    <CloudinaryContext cloudName="dphyecnpy">
      <Image publicId={publicId} width="300" crop="scale" />
    </CloudinaryContext>
  )
}

export default CloudPreview;
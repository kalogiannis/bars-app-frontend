
type PhotosTabProps ={
  images: string[];
  alt: string;
}

const PhotosTab = ({ images, alt }:PhotosTabProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Photos</h2>
    <div className="grid grid-cols-3 gap-4">
      {images.map((src, idx) => (
        <img key={idx} src={src} alt={`${alt} photo ${idx + 1}`} className="w-full h-48 object-cover rounded-lg" />
      ))}
    </div>
  </div>
);

export default PhotosTab;
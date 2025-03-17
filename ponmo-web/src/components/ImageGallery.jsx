const galleryImages = [
   "/cameraCharity.jpg",
   "/iimgn.jpg",
   "/Charpics.jpg",
   "/heroImage.jpg",
   "/heroimg.jpg",
   "/foodCharity.jpg",
   "/tapWater1.jpg",
   "/event5.jpg",
  ];
  
  export default function ImageGallery() {
    return (
      <section className="text-center py-12">
        <div className="grid grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <img key={index} src={image} alt={`Gallery ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
          ))}
        </div>
      </section>
    );
  }
  
import { useEffect } from "react";

function useSocketReceiveImages({ socketRef, setReceivedImages }) {
  useEffect(() => {
    socketRef.current.on("message", (data) => {
      const imagesData = data.imagesData;

      setReceivedImages((prev) => {
        let updatedImages = [...prev];

        if (imagesData.length === 0) return [];

        imagesData.forEach((newImage) => {
          const index = updatedImages.findIndex(
            (img) => img.id === newImage.id
          );

          if (index !== -1) {
            updatedImages[index] = {
              ...updatedImages[index],
              ...newImage,
            };
          } else {
            updatedImages.push({
              id: newImage.id,
              url: newImage.url,
              name: newImage.name,
              dimensions: newImage.dimensions,
              position: newImage.position,
              isSelected: newImage.isSelected,
              zIndex: newImage.zIndex,
            });
          }
        });

        return updatedImages;
      });
    });
  }, [socketRef, setReceivedImages]);
}

export default useSocketReceiveImages;

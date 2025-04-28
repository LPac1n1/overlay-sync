import { useEffect } from "react";

const isOverPlayer = (imageRect, playerRect) => {
  return (
    imageRect.bottom >= playerRect.top &&
    imageRect.right >= playerRect.left &&
    imageRect.top <= playerRect.bottom &&
    imageRect.left <= playerRect.right
  );
};

function useImagesOverPlayer({ playerRef, images, setImagesOverPlayer }) {
  useEffect(() => {
    if (!playerRef.current) return;

    const playerRect = playerRef.current.getBoundingClientRect();

    setImagesOverPlayer((prev) => {
      const newSet = new Set(prev);
      for (const image of prev) {
        if (!images.includes(image)) {
          newSet.delete(image);
        }
      }
      return newSet;
    });

    images.forEach((image) => {
      const imageRect = {
        x: image.position.x,
        y: image.position.y,
        width: image.dimensions.width,
        height: image.dimensions.height,
        top: image.position.y,
        right: image.position.x + image.dimensions.width,
        bottom: image.position.y + image.dimensions.height,
        left: image.position.x,
      };

      setImagesOverPlayer((prev) => {
        const newSet = new Set(prev);
        if (isOverPlayer(imageRect, playerRect)) {
          newSet.add(image);
        } else {
          newSet.delete(image);
        }
        return newSet;
      });
    });
  }, [playerRef, setImagesOverPlayer, images]);

  return;
}

export default useImagesOverPlayer;

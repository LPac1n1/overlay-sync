import { useEffect } from "react";

function useSocketReceiveImages({ socketRef, playerRef, imagesOverPlayer }) {
  useEffect(() => {
    const imagesData = Array.from(imagesOverPlayer).map((image) => {
      return {
        id: image.id,
        url: image.url,
        name: image.name,
        dimensions: {
          width: image.dimensions.width,
          height: image.dimensions.height,
        },
        position: {
          x: image.position.x,
          y: image.position.y,
        },
        isSelected: image.isSelected,
        zIndex: image.zIndex,
      };
    });

    socketRef.current.emit("message", {
      room: window.location.pathname.split("/").pop(),
      content: { imagesData },
    });
  }, [socketRef, playerRef, imagesOverPlayer]);
}

export default useSocketReceiveImages;

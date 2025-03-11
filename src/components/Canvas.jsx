import { useState } from "react";
import { useEffect } from "react";

function Canvas() {
  let [images, setImages] = useState([]);

  const onCanvasClick = (event) => {
    if (event.target.id.startsWith("image")) return;

    setImages(
      images.map((img) => {
        return { ...img, isSelected: false };
      })
    );
  };

  const onCanvasDragOver = (event) => {
    event.preventDefault();
  };

  const onCanvasDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      const imageReader = new FileReader();
      imageReader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const newImage = {
            id: `image-${images.length}`,
            url: imageReader.result,
            name: file.name,
            isSelected: false,
            position: { x: event.clientX, y: event.clientY },
            dimensions: {
              width: image.width / 5,
              height: image.height / 5,
            },
          };
          setImages([...images, newImage]);
        };
        image.src = imageReader.result;
      };
      imageReader.readAsDataURL(file);
    } else {
      alert("Por favor, insira uma imagem válida.");
    }
  };

  const selectAndDragMedia = (event, media, setMedia, id) => {
    setMedia(() => {
      const updateMediaSelect = media.map((med) => {
        if (id != med.id) return { ...med, isSelected: false };
        if (id == med.id) return { ...med, isSelected: true };
        return med;
      });
      return updateMediaSelect;
    });

    const selectedMedia = media.find((med) => med.id === id);
    const startX = event.clientX - selectedMedia.position.x;
    const startY = event.clientY - selectedMedia.position.y;

    const onMouseMove = (event) => {
      const newX = event.clientX - startX;
      const newY = event.clientY - startY;

      setMedia(() => {
        const updateMediaPosition = media.map((med) => {
          if (med.id === id)
            return { ...med, isSelected: true, position: { x: newX, y: newY } };
          return { ...med, isSelected: false };
        });
        return updateMediaPosition;
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const [eventListenerMap, setEventListenerMap] = useState(new Map());
  const resizingPossibility = (mediaDiv, id) => {
    const isCursorOnBorder = (event) => {
      const mediaDiv = event.target;
      const mediaDivPosition = mediaDiv.getBoundingClientRect();
      const { clientX, clientY } = event;
      const borderSize = 5;

      const onLeft =
        clientX >= mediaDivPosition.left &&
        clientX <= mediaDivPosition.left + borderSize;
      const onRight =
        clientX <= mediaDivPosition.right &&
        clientX >= mediaDivPosition.right - borderSize;
      const onTop =
        clientY >= mediaDivPosition.top &&
        clientY <= mediaDivPosition.top + borderSize;
      const onBottom =
        clientY <= mediaDivPosition.bottom &&
        clientY >= mediaDivPosition.bottom - borderSize;

      if (onLeft || onRight) {
        mediaDiv.style.cursor = "ew-resize";
      } else if (onTop || onBottom) {
        mediaDiv.style.cursor = "ns-resize";
      } else {
        mediaDiv.style.cursor = "auto";
      }
    };

    mediaDiv.addEventListener("mousemove", isCursorOnBorder);
    setEventListenerMap(eventListenerMap.set(id, isCursorOnBorder));
  };

  // isSelected media property handler
  useEffect(() => {
    images.forEach((img) => {
      const imageDiv = document.getElementById(img.id);

      if (img.isSelected) {
        resizingPossibility(imageDiv, img.id);
        return;
      }

      if (eventListenerMap.has(img.id)) {
        imageDiv.removeEventListener("mousemove", eventListenerMap.get(img.id));
        eventListenerMap.delete(img.id);

        imageDiv.style.cursor = "auto";
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.map((img) => img.isSelected).join(",")]);

  // Delete Media
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Delete") {
        setImages((images) => images.filter((img) => !img.isSelected));
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [setImages]);

  return (
    <div
      id="canvas"
      className="w-full h-full absolute z-50"
      onClick={onCanvasClick}
      onDragOver={onCanvasDragOver}
      onDrop={onCanvasDrop}
    >
      {images.map((img) => (
        <div
          key={img.id}
          id={img.id}
          alt={img.name}
          onMouseDown={(event) =>
            selectAndDragMedia(event, images, setImages, img.id)
          }
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "none",
            width: img.dimensions.width + 10,
            height: img.dimensions.height + 10,
            left: img.position.x - img.dimensions.width / 2,
            top: img.position.y - img.dimensions.height / 2,
            border: img.isSelected ? "2.5px solid cornflowerblue" : "none",
            zIndex: img.isSelected ? 1000 : 10,
          }}
        >
          <img
            src={img.url}
            width={img.dimensions.width}
            height={img.dimensions.height}
            draggable="false"
            style={{
              position: "relative",
              pointerEvents: "none",
              userSelect: "none",
              zIndex: img.isSelected ? 100 : 0,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Canvas;

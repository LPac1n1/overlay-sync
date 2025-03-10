import { useState } from "react";

function Canvas() {
  let [images, setImages] = useState([]);

  const onCanvasClick = (event) => {
    if (event.target.tagName == "IMG") return isMediaSelected(event);

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
            id: images.length,
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

  const isMediaSelected = (event) => {
    const SelectedMedia = event.target;
    const selectedMediaId = parseInt(SelectedMedia.id);

    setImages(() => {
      const updateSelectedMedia = images.map((img) => {
        if (selectedMediaId != img.id && img.isSelected == true)
          return { ...img, isSelected: false };
        if (selectedMediaId == img.id) return { ...img, isSelected: true };
        return img;
      });
      return updateSelectedMedia;
    });
  };

  const dragMedia = (event, media, id) => {
    const selectedMedia = media.find((media) => media.id === id);
    const startX = event.clientX - selectedMedia.position.x;
    const startY = event.clientY - selectedMedia.position.y;

    const onMouseMove = (event) => {
      const newX = event.clientX - startX;
      const newY = event.clientY - startY;

      setImages(() => {
        const updateMediaPosition = media.map((img) => {
          if (img.id === id) return { ...img, position: { x: newX, y: newY } };
          return img;
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

  const getMediaStyle = (media) => {
    return media.isSelected
      ? { outline: "solid 2.5px cadetblue", cursor: "grab" }
      : { outline: "none", cursor: "auto" };
  };

  return (
    <div
      id="canvas"
      className="w-full h-full absolute z-50"
      onClick={onCanvasClick}
      onDragOver={onCanvasDragOver}
      onDrop={onCanvasDrop}
    >
      {images.map((img) => (
        <img
          key={img.id}
          id={img.id}
          src={img.url}
          alt={img.name}
          width={img.dimensions.width}
          height={img.dimensions.height}
          onMouseDown={(event) => dragMedia(event, images, img.id)}
          style={{
            position: "absolute",
            left: img.position.x - img.dimensions.width / 2,
            top: img.position.y - img.dimensions.height / 2,
            ...getMediaStyle(img),
          }}
          draggable="false"
        />
      ))}
    </div>
  );
}

export default Canvas;

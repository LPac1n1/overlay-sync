import { useState } from "react";

function Canvas() {
  let [images, setImages] = useState([]);

  const onCanvasClick = (event) => {
    if (event.target.tagName == "IMG") return isMediaSelected(event);
    if (event.target.tagName != "IMG") {
      setImages(
        images.map((img) => {
          return { ...img, isSelected: false };
        })
      );
    }
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
            dimensions: {
              width: image.width / 4,
              height: image.height / 4,
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
      const updateSelectedImage = images.map((img) => {
        if (selectedMediaId != img.id && img.isSelected == true)
          return { ...img, isSelected: false };
        if (selectedMediaId == img.id) return { ...img, isSelected: true };
        return img;
      });
      return updateSelectedImage;
    });
  };

  const getMediaStyle = (media) => {
    return media.isSelected
      ? { outline: "solid 2.5px cadetblue" }
      : { outline: "none" };
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
          style={getMediaStyle(img)}
          className="image absolute"
        />
      ))}
    </div>
  );
}

export default Canvas;

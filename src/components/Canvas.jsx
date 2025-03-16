import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

function Canvas() {
  const [images, setImages] = useState([]);
  const [imagesIndex, setImagesIndex] = useState([]);

  const onCanvasClick = (event) => {
    if (
      event.target.id.startsWith("image") ||
      event.target.id.endsWith("selection")
    )
      return;

    // Check if there is any image selected.
    let hasImageSelected = null;
    images.map((image) => image.isSelected).includes(true)
      ? (hasImageSelected = true)
      : (hasImageSelected = false);

    // If so, unselect it.
    if (hasImageSelected) {
      const allDOMElements = document.querySelectorAll("*");
      allDOMElements.forEach((element) => {
        element.style.cursor = "auto";
      });

      return setImages((prev) =>
        prev.map((image) => ({ ...image, isSelected: false }))
      );
    }

    // If you don't have it, nothing happens.
    return;
  };

  const onCanvasDrop = (event) => {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);
    files.forEach((file) => {
      if (!file.type.startsWith("image")) {
        return alert("Insira uma imagem válida!");
      }

      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          setImagesIndex((prev) => {
            return [...prev, prev.length + 1];
          });

          setImages((prev) => {
            const width = image.width / 5;
            const height = image.height / 5;

            return [
              ...prev,
              {
                id: `image-${uuid()}`,
                url: reader.result,
                name: file.name,
                dimensions: { width, height },
                position: {
                  x: event.clientX - width / 2,
                  y: event.clientY - height / 2,
                },
                isSelected: false,
                zIndex: prev.length + 1,
              },
            ];
          });
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const onImageMouseDown = (event) => {
    const selected = images.find((image) => image.id === event.target.id);

    let hasImageSelected = null;
    selected.isSelected
      ? (hasImageSelected = true)
      : (hasImageSelected = false);

    if (!hasImageSelected) {
      setImages((prev) =>
        prev.map((image) =>
          image.id === selected.id
            ? { ...image, isSelected: true, zIndex: imagesIndex.at(-1) }
            : {
                ...image,
                isSelected: false,
                zIndex: image.zIndex > 0 ? image.zIndex - 1 : image.zIndex,
              }
        )
      );
    }

    const startX = event.clientX - selected.position.x;
    const startY = event.clientY - selected.position.y;

    const onMouseMove = (event) => {
      event.target.style.cursor = "move";

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const imageWidth = selected.dimensions.width + 10;
      const imageHeight = selected.dimensions.height + 10;

      let newX = event.clientX - startX;
      let newY = event.clientY - startY;

      newX = Math.max(0, Math.min(screenWidth - imageWidth, newX));
      newY = Math.max(0, Math.min(screenHeight - imageHeight, newY));

      setImages((prev) =>
        prev.map((image) =>
          image.id === selected.id
            ? { ...image, position: { x: newX, y: newY } }
            : image
        )
      );
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      event.target.style.cursor = "auto";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onSelectionMouseMove = (event) => {
    if (!event.target.id.endsWith("selection")) return;

    const rect = event.target.getBoundingClientRect();
    const { clientX, clientY } = event;
    const border = 5;
    let onLeft = clientX >= rect.left && clientX <= rect.left + border;
    let onRight = clientX <= rect.right && clientX >= rect.right - border;
    let onTop = clientY >= rect.top && clientY <= rect.top + border;
    let onBottom = clientY <= rect.bottom && clientY >= rect.bottom - border;
    event.target.style.cursor =
      onLeft && onTop
        ? "nw-resize"
        : onLeft && onBottom
        ? "sw-resize"
        : onRight && onTop
        ? "ne-resize"
        : onRight && onBottom
        ? "se-resize"
        : onLeft
        ? "w-resize"
        : onTop
        ? "n-resize"
        : onRight
        ? "e-resize"
        : onBottom
        ? "s-resize"
        : "auto";
  };

  const onSelectionMouseDown = (event) => {
    if (!event.target.id.endsWith("selection")) return;

    const selection = event.target;
    const selectionImage = selection.children[0];
    const selected = images.find((image) => image.id === selectionImage.id);

    const aspectRatio = selected.dimensions.width / selected.dimensions.height;

    const startClientX = event.clientX;
    const startClientY = event.clientY;
    const startImageWidth = selected.dimensions.width;
    const startImageHeight = selected.dimensions.height;
    const startImageX = selected.position.x;
    const startImageY = selected.position.y;

    const resizeImage = (side) => {
      const onMouseMove = (event) => {
        const { clientX, clientY } = event;

        const differenceX = clientX - startClientX;
        const differenceY = clientY - startClientY;

        setImages((prev) =>
          prev.map((image) => {
            if (image.id === selected.id) {
              let newWidth = null;
              let newHeight = null;

              let newX = null;
              let newY = null;

              switch (side) {
                case "top-left":
                  newWidth = Math.max(20, startImageWidth - differenceX);
                  newHeight = newWidth / aspectRatio;

                  newX = startImageX + startImageWidth - newWidth;
                  newY = startImageY + startImageHeight - newHeight;
                  break;
                case "bottom-left":
                  newWidth = Math.max(20, startImageWidth - differenceX);
                  newHeight = newWidth / aspectRatio;

                  newX = startImageX + startImageWidth - newWidth;
                  newY = startImageY;
                  break;
                case "top-right":
                  newWidth = Math.max(20, startImageWidth + differenceX);
                  newHeight = newWidth / aspectRatio;

                  newX = startImageX;
                  newY = startImageY + startImageHeight - newHeight;
                  break;

                case "bottom-right":
                  newWidth = Math.max(20, startImageWidth + differenceX);
                  newHeight = newWidth / aspectRatio;

                  newX = startImageX;
                  newY = startImageY;
                  break;

                case "left":
                  newWidth = Math.max(20, startImageWidth - differenceX);
                  newHeight = newWidth / aspectRatio;

                  newX =
                    newWidth > 20
                      ? startImageX + differenceX
                      : startImageX + startImageWidth - 20;
                  newY = startImageY + (startImageHeight - newHeight) / 2;
                  break;

                case "top":
                  newHeight = Math.max(11, startImageHeight - differenceY);
                  newWidth = newHeight * aspectRatio;

                  newY =
                    newHeight > 11
                      ? startImageY + differenceY
                      : startImageY + startImageHeight - 11;
                  newX = startImageX + (startImageWidth - newWidth) / 2;
                  break;

                case "right":
                  newWidth = Math.max(20, startImageWidth + differenceX);
                  newHeight = newWidth / aspectRatio;

                  newX = startImageX;
                  newY = startImageY + (startImageHeight - newHeight) / 2;
                  break;

                case "bottom":
                  newHeight = Math.max(11, startImageHeight + differenceY);
                  newWidth = newHeight * aspectRatio;

                  newY = startImageY;
                  newX = startImageX + (startImageWidth - newWidth) / 2;
                  break;
              }

              return {
                ...image,
                dimensions: {
                  width: newWidth,
                  height: newHeight,
                },

                position: {
                  x: newX,
                  y: newY,
                },
              };
            }

            return image;
          })
        );
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    switch (selection.style.cursor) {
      case "nw-resize":
        resizeImage("top-left");
        break;
      case "sw-resize":
        resizeImage("bottom-left");
        break;
      case "ne-resize":
        resizeImage("top-right");
        break;
      case "se-resize":
        resizeImage("bottom-right");
        break;
      case "w-resize":
        resizeImage("left");
        break;
      case "n-resize":
        resizeImage("top");
        break;
      case "e-resize":
        resizeImage("right");
        break;
      case "s-resize":
        resizeImage("bottom");
        break;
    }
  };

  // Remove selected image.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Delete") {
        setImages((prev) => prev.filter((image) => !image.isSelected));
        setImagesIndex((prev) => prev.slice(0, -1));
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      onClick={(event) => onCanvasClick(event)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => onCanvasDrop(event)}
      className="w-screen h-screen absolute z-50"
    >
      {images.map((img) => (
        <div
          onMouseMove={
            img.isSelected ? (event) => onSelectionMouseMove(event) : null
          }
          onMouseDown={
            img.isSelected ? (event) => onSelectionMouseDown(event) : null
          }
          className="absolute flex justify-center items-center"
          key={img.id}
          id={`${img.id}-selection`}
          style={{
            width: img.dimensions.width + 10,
            height: img.dimensions.height + 10,
            top: img.position.y,
            left: img.position.x,
            border: img.isSelected ? "2.5px solid cornflowerblue" : "none",
            zIndex: img.zIndex - 1,
          }}
        >
          <img
            onMouseDown={(event) => onImageMouseDown(event)}
            className="select-none"
            id={img.id}
            src={img.url}
            alt={img.name}
            width={img.dimensions.width}
            height={img.dimensions.height}
            draggable={false}
            style={{
              zIndex: img.zIndex,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Canvas;

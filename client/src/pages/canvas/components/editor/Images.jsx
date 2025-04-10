import { useEffect, useContext } from "react";

import { ImagesContext } from "../../../../context/ImagesContext";

const setCursor = (cursor, element = false) => {
  if (element) return (element.style.cursor = cursor);

  const allDOMElements = document.querySelectorAll("*");
  return allDOMElements.forEach((element) => {
    element.style.setProperty("cursor", `${cursor}`, "important");
  });
};

const resetCursor = () => {
  const allDOMElements = document.querySelectorAll("*");
  return allDOMElements.forEach((element) => {
    element.style.cursor = "auto";
  });
};

function Images() {
  const { images, setImages } = useContext(ImagesContext);

  const onImageMouseDown = (event) => {
    const selected = images.find((image) => image.id === event.target.id);

    setCursor("move");

    let hasImageSelected = null;
    selected.isSelected
      ? (hasImageSelected = true)
      : (hasImageSelected = false);

    if (!hasImageSelected) {
      selected.html.current;

      setImages((prev) =>
        prev.map((image) =>
          image.id === selected.id
            ? { ...image, isSelected: true }
            : {
                ...image,
                isSelected: false,
              }
        )
      );
    }

    onImageMouseMove(event, selected);
  };

  const onImageMouseMove = (event, selected) => {
    const startX = event.clientX - selected.position.x;
    const startY = event.clientY - selected.position.y;

    const onMouseMove = (event) => {
      setCursor("move");

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
      resetCursor();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setCursor("grab", event.target);
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

    const calculateResize = (side, differenceX, differenceY) => {
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

      return { newHeight, newWidth, newX, newY };
    };

    const resizeImage = (side) => {
      const onMouseMove = (event) => {
        const { clientX, clientY } = event;

        const differenceX = clientX - startClientX;
        const differenceY = clientY - startClientY;

        const { newWidth, newHeight, newX, newY } = calculateResize(
          side,
          differenceX,
          differenceY
        );

        setImages((prev) =>
          prev.map((image) => {
            if (image.id === selected.id) {
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
        resetCursor();
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const cursorToSide = {
      "nw-resize": "top-left",
      "sw-resize": "bottom-left",
      "ne-resize": "top-right",
      "se-resize": "bottom-right",
      "w-resize": "left",
      "n-resize": "top",
      "e-resize": "right",
      "s-resize": "bottom",
    };

    const side = cursorToSide[selection.style.cursor];
    setCursor(selection.style.cursor);
    if (side) resizeImage(side);
  };

  // Remove selected image.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Delete") {
        setImages((prev) => prev.filter((image) => !image.isSelected));
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [setImages]);

  return images.map((img) => (
    <div
      onMouseDown={
        img.isSelected ? (event) => onSelectionMouseDown(event) : null
      }
      onMouseMove={
        img.isSelected ? (event) => onSelectionMouseMove(event) : null
      }
      key={img.id}
      id={`${img.id}-selection`}
      className="absolute flex justify-center items-center"
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
        onMouseOver={(event) => (event.target.style.cursor = "grab")}
        onMouseDown={(event) => onImageMouseDown(event)}
        id={img.id}
        ref={img.html}
        src={img.url}
        alt={img.name}
        width={img.dimensions.width}
        height={img.dimensions.height}
        draggable={false}
        className="select-none"
        style={{
          zIndex: img.zIndex,
        }}
      />
    </div>
  ));
}

export default Images;

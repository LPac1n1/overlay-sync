import { useState, useEffect } from "react";

function Canvas() {
  const [images, setImages] = useState([]);

  const onCanvasClick = (event) => {
    if (!event.target.id.startsWith("image")) {
      setImages((prev) => prev.map((img) => ({ ...img, isSelected: false })));
    }
  };

  const onCanvasDragOver = (event) => event.preventDefault();

  const onCanvasDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Por favor, insira uma imagem válida.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          setImages((prev) => [
            ...prev,
            {
              id: `image-${prev.length}`,
              url: reader.result,
              name: file.name,
              isSelected: false,
              position: { x: event.clientX, y: event.clientY },
              dimensions: { width: image.width / 5, height: image.height / 5 },
            },
          ]);
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const selectAndDragMedia = (event, id) => {
    setImages((prev) =>
      prev.map((img) => ({ ...img, isSelected: img.id === id }))
    );

    const selected = images.find((img) => img.id === id);
    if (!selected) return;

    const startX = event.clientX - selected.position.x;
    const startY = event.clientY - selected.position.y;

    const onMouseMove = (event) => {
      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? {
                ...img,
                position: {
                  x: event.clientX - startX,
                  y: event.clientY - startY,
                },
              }
            : img
        )
      );
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const isCursorOnSelection = (event) => {
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
        : onLeft || onRight
        ? "ew-resize"
        : onTop || onBottom
        ? "ns-resize"
        : "auto";

    return { onLeft, onRight, onTop, onBottom };
  };

  useEffect(() => {
    images.forEach((img) => {
      const element = document.getElementById(img.id);
      if (!element) return;

      if (img.isSelected) {
        element.addEventListener("mousemove", isCursorOnSelection);
      } else {
        element.removeEventListener("mousemove", isCursorOnSelection);
        element.style.cursor = "auto";
      }
    });

    return () => {
      images.forEach((img) => {
        const element = document.getElementById(img.id);
        if (element) {
          element.removeEventListener("mousemove", isCursorOnSelection);
        }
      });
    };
  }, [images]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Delete") {
        setImages((prev) => prev.filter((img) => !img.isSelected));
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

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
          onMouseDown={(event) => selectAndDragMedia(event, img.id)}
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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

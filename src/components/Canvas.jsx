function Canvas(props) {
  console.log(props.images);
  return (
    <div
      className="w-full h-full absolute z-50"
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
    >
      {props.images.map((img) => (
        <img
          key={img.id}
          src={img.url}
          alt={img.name}
          width={img.dimensions.width}
          height={img.dimensions.height}
          className="absolute"
        />
      ))}
    </div>
  );
}

export default Canvas;

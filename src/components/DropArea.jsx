function dropArea() {
  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      className="w-1/3 h-full bg-zinc-300"
      id="drop-area"
    ></div>
  );
}

export default dropArea;

import { createContext, useState } from "react";

const ImagesContext = createContext();

const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  return (
    <ImagesContext.Provider value={{ images, setImages }}>
      {children}
    </ImagesContext.Provider>
  );
};

export { ImagesProvider, ImagesContext };

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import verifyToken from "../../services/api/verifyToken";
import verifyOverlayRoute from "../../services/api/verifyOverlayRoute.js";

import NotFound from "../../pages/others/NotFound";
import AccessDenied from "../../pages/others/AccessDenied";

import { io } from "socket.io-client";

const transformScale = (playerRect, images) => {
  const scaleX = window.innerWidth / playerRect.width;
  const scaleY = window.innerHeight / playerRect.height;

  const transformedImages = [];

  images.forEach((image) => {
    transformedImages.push({
      id: image.id,
      src: image.src,
      x: (image.x - playerRect.x) * scaleX,
      y: (image.y - playerRect.y) * scaleY,
      width: image.width * scaleX,
      height: image.height * scaleY,
      zIndex: image.zIndex,
    });
  });

  return transformedImages;
};

function Overlay() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isLogged = await verifyToken();
        isLogged ? setLoading(false) : navigate("/authentication");
      } catch (error) {
        console.error(error);
        navigate("/authentication");
      }
    };

    checkAuth();
  }, [navigate]);

  const [notFound, setNotFound] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const route = window.location.pathname.split("/").pop();

    const verifyRoute = async () => {
      try {
        await verifyOverlayRoute(route);
      } catch (error) {
        const { message } = JSON.parse(error.message);

        if (message.includes("not found")) {
          return setNotFound(true);
        }

        if (message.includes("access denied")) {
          return setAccessDenied(true);
        }
      }
    };

    verifyRoute();
  }, []);

  const socketRef = useRef(null);
  const overlayRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      socketRef.current.emit("message", { type: "overlay" });
    });

    socketRef.current.on("message", (data) => {
      setImages(transformScale(data.playerData, data.imagesData));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  if (loading) return null;
  if (notFound) return <NotFound />;
  if (accessDenied) return <AccessDenied />;

  return (
    <div
      ref={overlayRef}
      className="relative w-screen h-screen pointer-events-none overflow-hidden"
    >
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          width={img.width}
          height={img.height}
          style={{
            position: "absolute",
            left: img.x,
            top: img.y,
          }}
        ></img>
      ))}
    </div>
  );
}

export default Overlay;

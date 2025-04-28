import { useEffect } from "react";
import Hls from "hls.js";

function useHlsPlayer({ videoRef, streamKey, setIsStreamReady }) {
  useEffect(() => {
    let hls;
    const video = videoRef.current;

    if (Hls.isSupported() && video) {
      hls = new Hls();
      hls.loadSource(`http://localhost:8080/hls/${streamKey}.m3u8`);
      hls.attachMedia(video);

      setIsStreamReady(true);

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setIsStreamReady(false);
        }
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [videoRef, streamKey, setIsStreamReady]);
}

export default useHlsPlayer;

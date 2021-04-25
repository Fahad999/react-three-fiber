import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer() {
    const videoRef = useRef(null);
    const src =
        "https://stream.mux.com/4w3BMKP66nMZLHr6QqH8JiVAvcOfcshb7TVbqslJmpY.m3u8";
    useEffect(() => {
        let hls;
        if (videoRef.current) {
            const video = videoRef.current;

            if (video.canPlayType("application/vnd.apple.mpegurl")) {
                // Some browers (safari and ie edge) support HLS natively
                video.src = src;
            } else if (Hls.isSupported()) {
                // This will run in all other modern browsers
                hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(video);
            } else {
                console.error(
                    "This is a legacy browser that doesn't support MSE"
                );
            }
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [videoRef]);

    return (
        <video
            style={{
                WebkitTransform: "scaleX(-1)",
                // outlineStyle: "dotted",
                // outlineColor: "white",
                outline: "unset",
                // width: "100%",
                // maxWidth: "500px",
            }}
            height={790}
            width={800}
            controls
            ref={videoRef}
            // style={{ width: "100%", maxWidth: "500px" }}
        />
    );
}

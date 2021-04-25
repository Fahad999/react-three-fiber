//
// This example assumes you are importing mux-embed from npm
// View this code on codesandbox: https://codesandbox.io/s/mux-data-hls-js-react-ucvvh
//
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import mux from "mux-embed";

export default function VideoPlayer() {
    const videoRef = useRef(null);
    const src =
        "https://stream.mux.com/4w3BMKP66nMZLHr6QqH8JiVAvcOfcshb7TVbqslJmpY.m3u8";

    useEffect(() => {
        let hls;
        if (videoRef.current) {
            const video = videoRef.current;
            const initTime = Date.now();

            if (video.canPlayType("application/vnd.apple.mpegurl")) {
                // This will run in safari, where HLS is supported natively
                video.src = src;
            } else if (Hls.isSupported()) {
                // This will run in all other modern browsers
                hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(video);
            }

            mux.monitor(video, {
                debug: false,
                // pass in the 'hls' instance and the 'Hls' constructor
                hlsjs: hls,
                Hls,
                data: {
                    env_key: "tvaa9hlrf1kr2lv764trnp4en", // required
                    // Metadata fields
                    player_name: "Main Player", // any arbitrary string you want to use to identify this player
                    player_init_time: initTime,
                    // ...
                },
            });
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [videoRef]);

    return (
        <video
            controls
            ref={videoRef}
            style={{ width: "100%", maxWidth: "500px" }}
        />
    );
}

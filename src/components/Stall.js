import React, { useCallback } from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import demo from "../assets/demo.glb";

const Booth = () => {
    let url = demo;
    const box = new THREE.Box3();

    var video = document.createElement("video");
    video.loop = true;
    video.crossOrigin = "anonymous";
    // video.preload = 'none';
    video.muted = "muted";
    // video.setAttribute("id","yourId")
    video.load();
    video.src =
        "https://player.vimeo.com/external/532533432.hd.mp4?s=83957cee6419d40411a1ac6a7a080e9e06fbaf55&profile_id=174";
    // video.controls = true
    let posttt = video.play();

    var texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    var material = new THREE.MeshBasicMaterial({ map: texture });

    const stall_ref = useCallback((node) => {
        if (node !== null) {
            // console.log('node', node)
            let b = box.setFromObject(node);
            let arr = [];

            node.children.map((i, index) => {
                // i.onClick(window.alert("Clicked" + i.name));
                console.log(i.name, i);
                if (i.name === "video_wall_01") {
                    // console.log(i.name, "Found")
                    // console.log(i.children[0])
                    i.material = material;
                    i.material.map.flipY = false;
                }

                let box1 = new THREE.Box3();
                let b1 = box1.setFromObject(i);

                b1.name = i.name;
                arr.push(b1);
            });
        }
    }, []);

    const glb = useLoader(
        GLTFLoader,
        url,
        (onprogress = () => {
            console.log("loading");
        })
    );

    return (
        <>
            <primitive object={glb.scene} ref={stall_ref} />
        </>
    );
};

export default Booth;

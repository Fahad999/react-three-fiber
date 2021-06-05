import React, { useCallback, useEffect } from "react";
import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import demo from "../assets/without.glb";
import desk from "../assets/help_desk.glb";
import document_zone from "../assets/document.glb";
import video_zone from "../assets/videozone.glb";
import presentation_zone from "../assets/prasantion.glb";

import { Html } from "@react-three/drei";
import Vimeo from "@u-wave/react-vimeo";
import MuxPlayer from "./muxLivestream";
import videoD from "../assets/1280.mp4";
import sintelimage from "../assets/sintel1.png";
import { isEmpty } from "lodash";
// import document from "../assets/document.glb";
import lady from "../assets/lady.glb";
const Booth = () => {
    const { camera, gl, scene } = useThree();

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
        "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4";
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
                // console.log(i.name, i);
                if (i.name === "video_wall_01") {
                    // console.log(i.name, "Found")
                    // console.log(i.children[0])
                    // i.children = (
                    //     <mesh geometry={i.geometry}>
                    //         <meshStandardMaterial color="hotpink" />
                    //     </mesh>
                    // );
                    // i.material = <meshStandardMaterial color="hotpink" />;
                    // i.material.map.flipY = false;
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

    let example = new THREE.Object3D();

    const deskfile = useLoader(
        GLTFLoader,
        desk,
        (onprogress = () => {
            console.log("loading");
        })
    );

    const ladymesh = useLoader(
        GLTFLoader,
        lady,
        (onprogress = () => {
            console.log("loading");
        })
    );

    const documentZone = useLoader(
        GLTFLoader,
        document_zone,
        (onprogress = () => {
            console.log("loading");
        })
    );

    const videoZone = useLoader(
        GLTFLoader,
        video_zone,
        (onprogress = () => {
            console.log("loading");
        })
    );
    const presentationZone = useLoader(
        GLTFLoader,
        presentation_zone,
        (onprogress = () => {
            console.log("loading");
        })
    );
    console.log(glb.scene, "Scene muthe");
    useEffect(() => {
        if (!isEmpty(glb.scene)) {
            example = deskfile.scene;
            scene.add(example);
            example = ladymesh.scene;
            scene.add(example);
            example = documentZone.scene;
            scene.add(example);
            example = videoZone.scene;
            scene.add(example);
            example = presentationZone.scene;
            scene.add(example);
        }
    }, [glb]);

    return (
        <>
            <primitive object={glb.scene} ref={stall_ref}>
                {glb.scene.children.map((i, index) => {
                    // console.log(i.name, i);
                    if (i.name == "presentation_wall_01") {
                        console.log("sucess");
                        return (
                            <mesh
                                geometry={i.geometry}
                                position={i.position}
                                // matrix={i.matrix}
                                rotation={i.rotation}
                                scale={i.scale}
                                quaternion={i.quaternion}
                                parent={i.parent}
                                matrixWorld={i.matrixWorld}
                                layers={i.layers}
                                up={i.up}
                                matrixAutoUpdate={true}
                                matrixWorldNeedsUpdate={false}
                            >
                                <meshStandardMaterial color="black" />
                                <Html
                                    transform
                                    distanceFactor={1}
                                    zIndexRange={[0, 0]}
                                >
                                    {/* */}
                                    <Vimeo
                                        style={{
                                            // WebkitTransform: "scaleX(-1)",
                                            // outlineStyle: "dotted",
                                            // outlineColor: "white",
                                            outline: "unset",
                                        }}
                                        video="https://vimeo.com/389102557"
                                        autoplay={false}
                                        height="790"
                                        width="790"
                                    />
                                    {/* <MuxPlayer /> */}
                                </Html>
                            </mesh>
                        );
                    }

                    if (i.name == "videozone") {
                        return (
                            <mesh
                                geometry={i.geometry}
                                position={i.position}
                                // matrix={i.matrix}
                                rotation={i.rotation}
                                scale={i.scale}
                                quaternion={i.quaternion}
                                parent={i.parent}
                                matrixWorld={i.matrixWorld}
                                layers={i.layers}
                                up={i.up}
                                matrixAutoUpdate={true}
                                matrixWorldNeedsUpdate={false}
                            >
                                <meshStandardMaterial color="black" />
                                <Html transform distanceFactor={1}>
                                    <video
                                        poster={sintelimage}
                                        style={{
                                            WebkitTransform: "scaleX(-1)",
                                            outline: "unset",
                                        }}
                                        width="800"
                                        height="700"
                                        controls="true"
                                        autoplay="true"
                                        name="media"
                                    >
                                        <source
                                            src={videoD}
                                            type="video/mp4"
                                        ></source>
                                    </video>
                                </Html>
                            </mesh>
                        );
                    }
                })}
            </primitive>
        </>
    );
};

export default Booth;

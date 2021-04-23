import React, { useCallback } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import demo from "../assets/demo.glb";
import { Html } from "@react-three/drei";
import Vimeo from "@u-wave/react-vimeo";

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
    console.log(glb.scene, "Scene muthe");

    return (
        <>
            <primitive object={glb.scene} ref={stall_ref}>
                {glb.scene.children.map((i, index) => {
                    console.log(i.name, i);
                    if (i.name == "video_wall_01") {
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
                                <Html transform distanceFactor={1}>
                                    {/* <video
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
                                            src="https://vod-progressive.akamaized.net/exp=1619114622~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F86%2F21%2F525432693%2F2464644377.mp4~hmac=abd63479b38d2e0999032cf79e387724616d9801363c6e501583da296842ecb3/vimeo-prod-skyfire-std-us/01/86/21/525432693/2464644377.mp4?filename=Enrolling+_+Molina+Marketplace+Explainer+Series.mp4"
                                            type="video/mp4"
                                        ></source>
                                    </video> */}
                                    <Vimeo
                                        style={{
                                            WebkitTransform: "scaleX(-1)",
                                            // outlineStyle: "dotted",
                                            // outlineColor: "white",
                                            outline: "unset",
                                        }}
                                        video="https://vimeo.com/535737026"
                                        autoplay={false}
                                        height="790"
                                        width="800"
                                    />
                                </Html>
                            </mesh>
                        );
                    }

                    // if (i.name == "presentation_screen") {
                    //     return (
                    //         <mesh
                    //             geometry={i.geometry}
                    //             position={i.position}
                    //             // matrix={i.matrix}
                    //             rotation={i.rotation}
                    //             scale={i.scale}
                    //             quaternion={i.quaternion}
                    //             parent={i.parent}
                    //             matrixWorld={i.matrixWorld}
                    //             layers={i.layers}
                    //             up={i.up}
                    //             matrixAutoUpdate={true}
                    //             matrixWorldNeedsUpdate={false}
                    //         >
                    //             <meshStandardMaterial color="black" />
                    //             <Html transform distanceFactor={1}>
                    //                 {/* <video
                    //                     style={{
                    //                         WebkitTransform: "scaleX(-1)",
                    //                         outline: "unset",
                    //                     }}
                    //                     width="800"
                    //                     height="700"
                    //                     controls="true"
                    //                     autoplay="true"
                    //                     name="media"
                    //                 >
                    //                     <source
                    //                         src="https://vod-progressive.akamaized.net/exp=1619114622~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F86%2F21%2F525432693%2F2464644377.mp4~hmac=abd63479b38d2e0999032cf79e387724616d9801363c6e501583da296842ecb3/vimeo-prod-skyfire-std-us/01/86/21/525432693/2464644377.mp4?filename=Enrolling+_+Molina+Marketplace+Explainer+Series.mp4"
                    //                         type="video/mp4"
                    //                     ></source>
                    //                 </video> */}
                    //                 <Vimeo
                    //                     style={{
                    //                         WebkitTransform: "scaleX(-1)",
                    //                         // outlineStyle: "dotted",
                    //                         // outlineColor: "white",
                    //                         outline: "unset",
                    //                     }}
                    //                     video="https://vimeo.com/535737026"
                    //                     autoplay={false}
                    //                     height="790"
                    //                     width="800"
                    //                 />
                    //             </Html>
                    //         </mesh>
                    //     );
                    // }
                })}
            </primitive>
        </>
    );
};

export default Booth;

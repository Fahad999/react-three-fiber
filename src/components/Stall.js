import React, {
    useRef,
    useCallback,
    useMemo,
    useState,
    useEffect,
} from "react";
import { useGLTF } from "@react-three/drei/useGLTF";
import * as THREE from "three";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Canvas, useLoader, useFrame, useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import demo from "../assets/demo.glb";
import { Html } from "drei";
import ReactPlayer from "react-player";

const Booth = () => {
    let url = demo;
    const box = new THREE.Box3();

    const stall_ref = useCallback((node) => {
        if (node !== null) {
            // console.log('node', node)
            let b = box.setFromObject(node);
            let arr = [];

            node.children.map((i, index) => {
                // i.onClick(window.alert("Clicked" + i.name));
                console.log(i.name, i);

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

import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Clickable from "./components/Clickable";
import { Html } from "drei";
import Stall from "./components/Stall";
import LogoSpinner from "./components/common/LogoSpinner";
import "./styles.css";
function Loading() {
    return (
        <Html
            prepend="false"
            position
            style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
            }}
        >
            <LogoSpinner
                style={{ position: "absolute", top: "50vh", left: "50vw" }}
            />
        </Html>
    );
}

const App = () => {
    const cameraPosition = [-1, 3, 43];
    const cameraLookAt = [-1, 2, 0];
    return (
        <>
            <Canvas
                style={{ height: "100%" }}
                data-tut="reacttour_lol"
                id="canvas"
                concurrent
                camera={{ far: 10000, position: cameraPosition }}
                onCreated={({ camera, scene }) => {
                    camera.lookAt(
                        cameraLookAt[0],
                        cameraLookAt[1],
                        cameraLookAt[2]
                    );
                }}
            >
                <Suspense fallback={<Loading />}>
                    <Stall />
                    <ambientLight intensity={1} />
                    <Clickable />
                </Suspense>
            </Canvas>
        </>
    );
};

export default App;

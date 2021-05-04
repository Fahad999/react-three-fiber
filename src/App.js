import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Clickable from "./components/Clickable";
import { Html } from "@react-three/drei";
import Stall from "./components/Stall";
import LogoSpinner from "./components/common/LogoSpinner";
import "./styles.css";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

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
    const cameraPosition = [-1, 5, 43];
    const cameraLookAt = [-1, 5, 0];
    const [cameraState, setCameraState] = useState(undefined);

    const revertToOriginalPosition = () => {
        if (cameraState) {
            cameraState.position.set(-1, 5, 43);
            cameraState.lookAt(-1, 5, 0);
            cameraState.updateProjectionMatrix();
        }
    };
    return (
        <>
            <CancelRoundedIcon
                id={"revertToOriginalPosition"}
                style={{
                    position: "absolute",
                    zIndex: "10",
                    width: 47,
                    height: 47,
                    // left: "97vw",
                    right: "20px",
                    top: "20px",
                    borderRadius: "100%",
                    cursor: "pointer",
                }}
                // customIconContainer={classes.addIconContainerClass}
                // OpenIcon={CloseIcon}
                onClick={(event) => {
                    revertToOriginalPosition();
                }}
            ></CancelRoundedIcon>
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
                    setCameraState(camera);
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

import * as THREE from "three";
import React, { useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
    numberContainerDiv: {
        backgroundColor: "#1c1d1f80",
        color: "black",
        borderRadius: "45px",
        width: "25px",
        height: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        cursor: "pointer",
    },
    numberDiv: {
        backgroundColor: "#fff",
        borderRadius: "40px",
        width: "15px",
        height: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
    cancelButton: {
        right: theme.spacing(2.5),
    },
});

export const manageNavigationButtonDisplay = (meshArr) => {
    for (let i = 0; i < meshArr?.length; i++) {
        if (
            document.getElementById("navigateModelButton" + i).style.display ==
            "none"
        )
            document.getElementById("navigateModelButton" + i).style.display =
                "block";
    }
};

const Clickable = (props) => {
    const cameraPosition = [-1, 3, 43];
    const cameraLookAt = [-1, 2, 0];

    const positionArray = [
        [-21, 3, 12],
        [-0.6335110664367676, 3, 13.842817306518555],
        [-2.011301040649414, 3, -4.7442431449890137],
        [14.16017723083496, 3, 18.048870086669922],
        [9.96541690826416, 4, 0.2934397757053375],
    ];

    const lookAtArray = [
        [-37, 1, 0],
        [0, 0, 0],
        [-40, 0, -4300],
        [60, 0, 0],
        [40, 0, -10],
    ];

    const meshArray = [
        [-25.71963882446289, 8, 11.39088249206543],
        [-2, 0.2, 9.417530059814453],
        [-14.247562408447266, 5, -16.381975173950195],
        [21.181074142456055, 2, 16.847023963928223],
        [19.032665252685547, 3, -7.202614784240723],
    ];
    const { classes } = props;

    const [showBack, setShowBack] = useState(false);
    const { camera, gl } = useThree();
    let canvas;
    useFrame(() => {
        canvas = gl.domElement;
        canvas.addEventListener("webglcontextlost", (e) => {
            window.location.reload();
        });
    });

    const changeCameraHandler = (index) => {
        camera.fov = 75;
        camera.updateProjectionMatrix();
        manageNavigationButtonDisplay(meshArray);
        document.getElementById("navigateModelButton" + index).style.display =
            "none";

        camera.position.set(
            positionArray[index][0],
            positionArray[index][1],
            positionArray[index][2]
        );
        camera.lookAt(
            new THREE.Vector3(
                lookAtArray[index][0],
                lookAtArray[index][1],
                lookAtArray[index][2]
            )
        );
        setShowBack(true);
    };
    const initialCameraHandler = () => {
        camera.fov = 75;
        camera.updateProjectionMatrix();
        camera.position.set(
            cameraPosition[0],
            cameraPosition[1],
            cameraPosition[2]
        );
        camera.lookAt(cameraLookAt[0], cameraLookAt[1], cameraLookAt[2]);
        setShowBack(false);
        manageNavigationButtonDisplay(meshArray);
    };
    return (
        <>
            {showBack ? (
                <Html prepend="false" position>
                    <div
                        style={{
                            flexDirection: "column",
                            display: "flex",
                            position: "fixed",
                            top: "40%",
                            right: 37,
                            zIndex: 20,
                        }}
                    >
                        <CancelRoundedIcon
                            className={classes.cancelButton}
                            style={{
                                width: 47,
                                height: 47,
                                borderRadius: "100%",

                                cursor: "pointer",
                            }}
                            onClick={() => initialCameraHandler()}
                        />
                    </div>
                </Html>
            ) : null}

            {meshArray?.map((i, index) => {
                return (
                    <>
                        <mesh position={i} key={index}>
                            <meshBasicMaterial color="white" />

                            <Html center zIndexRange={[1, 0]}>
                                <div
                                    className={classes.menuItemContainerDiv}
                                    id={"navigateModelButton" + index}
                                    onClick={() => changeCameraHandler(index)}
                                >
                                    <div className={classes.numberContainerDiv}>
                                        <div className={classes.numberDiv}>
                                            <span>{index + 1}</span>
                                        </div>
                                    </div>
                                </div>
                            </Html>
                        </mesh>
                    </>
                );
            })}
        </>
    );
};

export default withStyles(styles)(Clickable);

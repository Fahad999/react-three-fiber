import * as THREE from "three";
import React, { useEffect, useState } from "react";
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
    const positions = [
        {
            name: "initialCameraCoordinates",
            cameraPosition: [-1, 3, 43],
            cameraLookAt: [-1, 2, 0],
            navButtonPosition: undefined,
            isVisible: {
                presentation: 0,
            },
        },

        {
            cameraPosition: [-21, 3, 12],
            cameraLookAt: [-37, 1, 0],
            navButtonPosition: [-25.71963882446289, 8, 11.39088249206543],
            name: "",
            isVisible: {
                presentation: 0,
            },
        },
        {
            cameraPosition: [-0.6335110664367676, 3, 13.842817306518555],
            cameraLookAt: [0, 0, 0],
            navButtonPosition: [-2, 0.2, 9.417530059814453],
            name: "presentation",
            isVisible: {
                presentation: 1,
            },
        },
        {
            cameraPosition: [-2.011301040649414, 3, -4.7442431449890137],
            cameraLookAt: [-40, 0, -4300],
            navButtonPosition: [-14.247562408447266, 5, -16.381975173950195],
            name: "",
            isVisible: {
                presentation: 0,
            },
        },
        {
            cameraPosition: [14.16017723083496, 3, 18.048870086669922],
            cameraLookAt: [60, 0, 0],
            navButtonPosition: [21.181074142456055, 2, 16.847023963928223],
            name: "",
            isVisible: {
                presentation: 0,
            },
        },
        {
            cameraPosition: [9.96541690826416, 4, 0.29343977570533756],
            cameraLookAt: [40, 0, -10],
            navButtonPosition: [19.032665252685547, 3, -7.202614784240723],
            name: "",
            isVisible: {
                presentation: 0,
            },
        },
    ];
    const { classes } = props;
    const [positionsArr, setPositionsArr] = useState(undefined);
    const [initialPositionsArr, setinitialPositionsArr] = useState(undefined);
    const [showBack, setShowBack] = useState(false);
    const { camera, gl } = useThree();
    let canvas;
    useFrame(() => {
        canvas = gl.domElement;
        canvas.addEventListener("webglcontextlost", (e) => {
            window.location.reload();
        });
    });

    useEffect(() => {
        if (positions) {
            setinitialPositionsArr(positions[0]);
            positions.shift();
            setPositionsArr(positions);
        }
    }, []);
    const changeCameraHandler = (index) => {
        camera.fov = 75;
        camera.updateProjectionMatrix();
        // manageNavigationButtonDisplay(meshArray);
        // document.getElementById("navigateModelButton" + index).style.display =
        //     "none";

        // camera.position.set(
        //     positionArray[index][0],
        //     positionArray[index][1],
        //     positionArray[index][2]
        // );
        camera.position.set(
            positionsArr[index].cameraPosition[0],
            positionsArr[index].cameraPosition[1],
            positionsArr[index].cameraPosition[2]
        );
        camera.lookAt(
            new THREE.Vector3(
                positionsArr[index].cameraLookAt[0],
                positionsArr[index].cameraLookAt[1],
                positionsArr[index].cameraLookAt[2]
            )
        );
        setShowBack(true);
    };
    const initialCameraHandler = () => {
        console.log("intial", initialPositionsArr);
        camera.fov = 75;
        camera.updateProjectionMatrix();
        camera.position.set(
            initialPositionsArr.cameraPosition[0],
            initialPositionsArr.cameraPosition[1],
            initialPositionsArr.cameraPosition[2]
        );
        camera.lookAt(
            initialPositionsArr.cameraLookAt[0],
            initialPositionsArr.cameraLookAt[1],
            initialPositionsArr.cameraLookAt[2]
        );
        setShowBack(false);
        // manageNavigationButtonDisplay(meshArray);
    };
    return (
        <>
            {/* {positions?.shift()} */}
            {console.log(positionsArr)}
            {positionsArr?.map((i, index) => {
                // console.log(i);
                return (
                    <>
                        <mesh position={i.navButtonPosition} key={index}>
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

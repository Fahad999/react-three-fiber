import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Spinner } from "reactstrap";

const LogoSpinner = ({ classes }) => {
    const [speed, setSpeed] = useState(2);
    return (
        <div
            style={
                {
                    // width: "100%",
                    // height: "100%",
                    // background: "rgba(227, 230, 240, 1)",
                }
            }
        >
            <div
                style={{
                    position: "absolute",
                    // top: "50%",
                    // left: "50%",
                    transform: `translate(${-50}%,${-50}%)`,
                    msTransform: `translate(${-50}%,${-50}%)`,
                }}
            >
                <img
                    style={{
                        animation: `spin ${speed}s linear infinite`,
                        height: "7vh",
                        width: "7vh",
                    }}
                    src="https://cdn2.hubspot.net/hub/5597072/hubfs/logo.png"
                    alt="img"
                />
            </div>
        </div>
    );
};

export default LogoSpinner;

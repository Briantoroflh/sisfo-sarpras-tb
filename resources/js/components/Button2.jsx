import { Link } from "@inertiajs/react";
import React from "react";
import styled from "styled-components";

const Button2 = ({text,onClick}) => {
    return (
        <StyledWrapper>
            <div>
                <button className="btn" onClick={onClick}>{text}</button>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .btn {
        width: 4.5em;
        height: 1.9em;
        margin: 0.5em;
        background: black;
        color: white;
        border: none;
        border-radius: 0.625em;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        position: relative;
        z-index: 1;
        overflow: hidden;
    }

    button:hover {
        color: black;
    }

    button:after {
        content: "";
        background: white;
        position: absolute;
        z-index: -1;
        left: -20%;
        right: -20%;
        top: 0;
        bottom: 0;
        transform: skewX(-45deg) scale(0, 1);
        transition: all 0.5s;
    }

    button:hover:after {
        transform: skewX(-45deg) scale(1, 1);
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }
`;

export default Button2;

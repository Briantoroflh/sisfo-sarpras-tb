import React from "react";
import styled from "styled-components";

const Button = ({children, onClick}) => {
    return (
        <StyledWrapper>
            <button onClick={onClick}>
                <span>{children}</span>
            </button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    button {
        padding: 0.1em 0.25em;
        width: 33.2em;
        height: 4.2em;
        background-color: #212121;
        border: 0.08em solid #fff;
        border-radius: 0.3em;
        font-size: 12px;
        cursor: pointer;
    }

    button span {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0.4em;
        width: 21.7em;
        height: 2.5em;
        background-color: #212121;
        border-radius: 0.2em;
        font-size: 1.5em;
        color: #fff;
        border: 0.08em solid #fff;
        box-shadow: 0 0.4em 0.1em 0.019em #fff;
    }

    button span:hover {
        transition: all 0.5s;
        transform: translate(0, 0.4em);
        box-shadow: 0 0 0 0 #fff;
    }

    button span:not(hover) {
        transition: all 1s;
    }
`;

export default Button;

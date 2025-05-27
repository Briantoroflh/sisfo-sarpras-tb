import React from "react";
import styled from "styled-components";

const RedButton = ({ onClick }) => {
    return (
        <StyledButton onClick={onClick}>
            <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5.1716 8.00003L1.08582 3.91424L3.91424 1.08582L8.00003 5.1716L12.0858 1.08582L14.9142 3.91424L10.8285 8.00003L14.9142 12.0858L12.0858 14.9142L8.00003 10.8285L3.91424 14.9142L1.08582 12.0858L5.1716 8.00003Z"
                    fill="#FFFFFF"
                />
            </svg>
        </StyledButton>
    );
};

const StyledButton = styled.button`
    font-size: 2.4rem;
    text-align: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #ffffff;
    border: 5px solid #fff;
    transition: all 0.3s ease;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f73a45;
    box-shadow: 0px 0px 5px #f73a45;

    &:active {
        transform: scale(0.95);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
    }

    svg {
        width: 10px;
        height: 10px;
    }
`;

export default RedButton;

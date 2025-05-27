import React from "react";
import styled from "styled-components";

const GreenButton = ({ onClick }) => {
    return (
        <StyledButton onClick={onClick}>
            <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15.4141 4.91424L5.99991 14.3285L0.585693 8.91424L3.41412 6.08582L5.99991 8.6716L12.5857 2.08582L15.4141 4.91424Z"
                    fill="#ffffff"
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
    background-color: #3eac21;
    box-shadow: 0px 0px 5px #3eac21;

    &:active {
        transform: scale(0.95);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
    }

    svg {
        width: 10px;
        height: 10px;
    }
`;

export default GreenButton;

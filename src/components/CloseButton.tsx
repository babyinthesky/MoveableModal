import React from 'react';
import CloseIcon from '../assets/close_icon.svg';

const CloseButton = ({
    onClick,
} : {
    onClick: () => void;
}) => (
    <div
        className="cursor-pointer close-button"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onClick}
    >
        <img
            src={CloseIcon}
            className="close-button-svg"
            alt="close"
        />
    </div>
);

export default CloseButton;

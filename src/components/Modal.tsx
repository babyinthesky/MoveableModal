import React, { SyntheticEvent, useRef, useState } from 'react';
import CloseButton from './CloseButton';

const Modal = ({
    children,
    isOpen,
    customStyles,
    header,
    onClose,
} : {
    children?: null | React.ReactElement;
    isOpen: boolean;
    customStyles?: {
        content?: React.CSSProperties;
        overlay?: React.CSSProperties;
    }
    header?: null | React.ReactElement;
    onClose: () => void;
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [startMove, setStartMove] = useState(false);
    const [modalPos, setModalPos] = useState({x: 0, y: 0});

    if (!isOpen) return null;

    const handleOnMouseUp = () => {
        if (startMove) {
            setStartMove(false);
        }
    }
    const handleOnMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (startMove) {
            const modalWidth = modalRef.current?.offsetWidth;
            const modalHeight = modalRef.current?.offsetHeight;
            const overlayWidth = event.currentTarget.offsetWidth;
            const overlayHeight = event.currentTarget.offsetHeight;
            if (modalWidth && modalHeight) {
                setModalPos({
                    x: Math.min(Math.max(modalPos.x + event.movementX, 0), overlayWidth - modalWidth),
                    y: Math.min(Math.max(modalPos.y + event.movementY, 0), overlayHeight - modalHeight),
                });
            }
        }
    }

    const handleModalOnLoad = (event: SyntheticEvent<HTMLDivElement>) => {
        // Initialize to center when modal opens at the first time
        if (modalPos.x === 0 && modalPos.y === 0) {
            const modalWidth = event.currentTarget.offsetWidth;
            const modalHeight = event.currentTarget.offsetHeight;
            const overlayWidth = event.currentTarget.parentElement?.offsetWidth;
            const overlayHeight = event.currentTarget.parentElement?.offsetHeight;
            if (overlayWidth && overlayHeight) {
                setModalPos({
                    x: (overlayWidth - modalWidth) / 2,
                    y: (overlayHeight - modalHeight) /2,
                });
            }
        }
    }

    const handleOnMouseDownToMove = () => {
        setStartMove(true);
        setModalPos({x: modalRef.current?.offsetLeft || 0, y: modalRef.current?.offsetTop || 0});
    }

    return (
        <div
            className="modal-overlay"
            style={customStyles?.overlay}
            onMouseMove={handleOnMouseMove}
            onMouseUp={handleOnMouseUp}
        >
            <div
                className="modal-content column"
                style={{
                    left: modalPos.x,
                    top: modalPos.y,
                    ...customStyles?.content,
                }}
                ref={modalRef}
                onLoad={handleModalOnLoad}
            >
                <div
                    className="modal-header modal-move"
                    onMouseDown={handleOnMouseDownToMove}
                >
                    <div className="right">
                        <CloseButton
                            onClick={onClose}
                        />
                    </div>
                </div>
                {header}
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

Modal.defaultProps = {
    customStyles: {},
    header: null,
    children: null,
};

export default Modal;

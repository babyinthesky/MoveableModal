import React, { SyntheticEvent, useRef, useState } from 'react';
import CloseButton from './CloseButton';

type ModalSizeType = {
    width: string | number;
    height: string | number;
}

type ActionType = 'Move' | 'ResizeNorth' | 'ResizeNW' | 'ResizeNE' 
    | 'ResizeWest' | 'ResizeEast' | 'ResizeSW' 
    | 'ResizeSouth' | 'ResizeSE' | null;

const MODAL_MIN_WIDTH = 100;
const MODAL_MIN_HEIGHT = 50;

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
        header?: React.CSSProperties;
    }
    header?: null | React.ReactElement;
    onClose: () => void;
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalPos, setModalPos] = useState({x: 0, y: 0});
    const [modalSize, setModalSize] = useState<ModalSizeType>({width: '60%', height: '70%'});
    const [action, setAction] = useState<ActionType>(null);
    const [rightBottomEdge, setRightBottomEdge] = useState({x: 0, y: 0});

    if (!isOpen) return null;

    const handleOnMouseUp = () => {
        setAction(null);
    }

    const handleOnMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (action) {
            const moveX = event.movementX;
            const moveY = event.movementY;
            const modalWidth = modalRef.current?.offsetWidth;
            const modalHeight = modalRef.current?.offsetHeight;
            const overlayWidth = event.currentTarget.offsetWidth;
            const overlayHeight = event.currentTarget.offsetHeight;

            if (modalWidth && modalHeight) {
                const maxMovePosX = overlayWidth - modalWidth;
                const maxMovePosY = overlayHeight - modalHeight;
                switch (action) {
                    case 'Move':
                        setModalPos({
                            x: Math.min(Math.max(modalPos.x + moveX, 0), maxMovePosX),
                            y: Math.min(Math.max(modalPos.y + moveY, 0), maxMovePosY),
                        });
                        break;
                    case 'ResizeNorth':
                        setModalPos({
                            x: modalPos.x,
                            y: Math.min(Math.max(modalPos.y + moveY, 0), rightBottomEdge.y),
                        });
                        setModalSize({
                            width: modalSize.width,
                            height: Math.min(Math.max(modalHeight - moveY, MODAL_MIN_HEIGHT), overlayHeight),
                        });
                        break;
                    case 'ResizeNW':
                        setModalPos({
                            x: Math.min(Math.max(modalPos.x + moveX, 0), rightBottomEdge.x),
                            y: Math.min(Math.max(modalPos.y + moveY, 0), rightBottomEdge.y),
                        });
                        setModalSize({
                            width: Math.min(Math.max(modalWidth - moveX, MODAL_MIN_WIDTH), overlayWidth),
                            height: Math.min(Math.max(modalHeight - moveY, MODAL_MIN_HEIGHT), overlayHeight),
                        });
                        break;
                    case 'ResizeNE':
                        setModalPos({
                            x: modalPos.x,
                            y: Math.min(Math.max(modalPos.y + moveY, 0), rightBottomEdge.y),
                        });
                        setModalSize({
                            width: Math.min(Math.max(modalWidth + moveX, MODAL_MIN_WIDTH), overlayWidth),
                            height: Math.min(Math.max(modalHeight - moveY, MODAL_MIN_HEIGHT), overlayHeight),
                        });
                        break;
                    case 'ResizeWest':
                        setModalPos({
                            x: Math.min(Math.max(modalPos.x + moveX, 0), rightBottomEdge.x),
                            y: modalPos.y,
                        });
                        setModalSize({
                            width: Math.min(Math.max(modalWidth - moveX, MODAL_MIN_WIDTH), overlayWidth),
                            height: modalHeight,
                        });
                        break;
                    case 'ResizeEast':
                        setModalSize({
                            width: Math.min(Math.max(modalWidth + moveX, MODAL_MIN_WIDTH), overlayWidth),
                            height: modalHeight,
                        });
                        break;
                    case 'ResizeSW':
                        setModalPos({
                            x: Math.min(Math.max(modalPos.x + moveX, 0), rightBottomEdge.x),
                            y: modalPos.y,
                        });
                        setModalSize({
                            width: Math.min(Math.max(modalWidth - moveX, MODAL_MIN_WIDTH), overlayWidth),
                            height: Math.min(Math.max(modalHeight + moveY, MODAL_MIN_HEIGHT), overlayHeight),
                        });
                        break;
                    case 'ResizeSouth':
                        setModalSize({
                            width: modalWidth,
                            height: Math.min(Math.max(modalHeight + moveY, MODAL_MIN_HEIGHT), overlayHeight),
                        });
                        break;
                    case 'ResizeSE':
                        setModalSize({
                            width: Math.min(Math.max(modalWidth + moveX, MODAL_MIN_WIDTH), overlayWidth),
                            height: Math.min(Math.max(modalHeight + moveY, MODAL_MIN_HEIGHT), overlayHeight),
                        });
                        break;
                    default:
                        break;
                }
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
                setModalSize({
                    width: 0.6 * overlayWidth,
                    height: 0.7 * overlayHeight,
                });
            }
        }
    }

    const handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement>, actionType: ActionType) => {
        if (event.button === 0) {
            const modalWidth = modalRef.current?.offsetWidth;
            const modalHeight = modalRef.current?.offsetHeight;
            setAction(actionType);
            if (modalWidth && modalHeight) {
                setRightBottomEdge({
                    x: modalPos.x + modalWidth - MODAL_MIN_WIDTH,
                    y: modalPos.y + modalHeight - MODAL_MIN_HEIGHT});
            }
        }
    }

    const handleOnMouseDownToMove = (event: React.MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'Move');
    }

    const handleOnMouseDownToResizeNW = (event: React.MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeNW');
    }

    const handleOnMouseDownToResizeNorth = (event: React.MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeNorth');
    }

    const handleOnMouseDownToResizeNE = (event: React.MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeNE');
    }

    const handleOnMouseDownToResizeWest = (event: React.MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeWest');
    }

    const handleOnMouseDownToResizeEast = (event: React.MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeEast');
    }

    const handleOnMouseDownToResizeSW = (event: React.MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeSW');
    }

    const handleOnMouseDownToResizeSouth = (event: React.MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeSouth');
    }

    const handleOnMouseDownToResizeSE = (event: React.MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeSE');
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
                    width: modalSize.width,
                    height: modalSize.height,
                    ...customStyles?.content,
                }}
                ref={modalRef}
                onLoad={handleModalOnLoad}
            >
                <div
                    className="modal-header"
                    style={customStyles?.header}
                >
                    <div className="row">
                        <div
                            className="resize-nw resize-corner"
                            onMouseDown={handleOnMouseDownToResizeNW}
                        />
                        <div
                            className="resize-n resize-horizon-border"
                            onMouseDown={handleOnMouseDownToResizeNorth}
                        />
                        <div
                            className="resize-ne resize-corner"
                            onMouseDown={handleOnMouseDownToResizeNE}
                        />
                    </div>
                    <div
                        className="modal-move row justify-space-between"
                        onMouseDown={handleOnMouseDownToMove}
                    >
                        <div className="modal-header-title">
                            {header}
                        </div>
                        <CloseButton
                            onClick={onClose}
                        />
                    </div>
                </div>

                <div className="modal-body row">
                    <div
                        className="resize-w resize-vertical-border"
                        onMouseDown={handleOnMouseDownToResizeWest}
                    />
                    <div className="modal-body">
                        {children}
                    </div>
                    <div
                        className="resize-e resize-vertical-border"
                        onMouseDown={handleOnMouseDownToResizeEast}
                    />
                </div>

                <div className="row">
                    <div
                        className="resize-sw resize-corner"
                        onMouseDown={handleOnMouseDownToResizeSW}
                    />
                    <div
                        className="resize-s resize-horizon-border"
                        onMouseDown={handleOnMouseDownToResizeSouth}
                    />
                    <div
                        className="resize-se resize-corner"
                        onMouseDown={handleOnMouseDownToResizeSE}
                    />
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

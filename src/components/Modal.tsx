import React, {
    useRef,
    useState,
    useCallback,
    MouseEvent,
    CSSProperties,
    ReactElement,
} from 'react';
import {MODAL_MIN_WIDTH, MODAL_MIN_HEIGHT} from '../conf';
import { ModalSizeType, ActionType, ModalPositionType } from '../types';
import ModalBody from './ModalContent';

const Modal = ({
    children,
    isOpen,
    customStyles,
    header,
    onClose,
} : {
    isOpen: boolean;
    children?: null | ReactElement;
    customStyles?: {
        content?: CSSProperties;
        overlay?: CSSProperties;
        header?: CSSProperties;
        body?: CSSProperties;
    }
    header?: null | ReactElement;
    onClose: () => void;
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalPos, setModalPos] = useState<ModalPositionType>({x: 0, y: 0});
    const [modalSize, setModalSize] = useState<ModalSizeType>({width: '60%', height: '70%'});
    const [action, setAction] = useState<ActionType>(null);
    const [rightBottomEdge, setRightBottomEdge] = useState<ModalPositionType>({x: 0, y: 0});

    const handleOnMouseUp = useCallback(() => {
        setAction(null);
    }, [setAction]);

    const handleOnMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
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
    }, [action, modalRef, modalPos, modalSize, rightBottomEdge, setModalPos, setModalSize]);

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            style={customStyles?.overlay}
            onMouseMove={handleOnMouseMove}
            onMouseUp={handleOnMouseUp}
        >
            <ModalBody
                modalRef={modalRef}
                modalPos={modalPos}
                modalSize={modalSize}
                setModalPos={setModalPos}
                setModalSize={setModalSize}
                setAction={setAction}
                setRightBottomEdge={setRightBottomEdge}
                onClose={onClose}
                children={children}
                header={header}
                customStyles={customStyles}
            />
        </div>
    );
};

Modal.defaultProps = {
    customStyles: {},
    header: null,
    children: null,
};

export default Modal;

import React, {
    SyntheticEvent,
    useCallback,
    MouseEvent,
    RefObject,
    ReactElement,
    CSSProperties,
} from 'react';
import {MODAL_MIN_WIDTH, MODAL_MIN_HEIGHT} from '../conf';
import { ActionType, ModalPositionType, ModalSizeType } from '../types';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalBottomEdge from './ModalBottomEdge';

const ModalContent = ({
    modalRef,
    modalPos,
    modalSize,
    setModalPos,
    setModalSize,
    setAction,
    setRightBottomEdge,
    onClose,
    children,
    header,
    customStyles,
} : {
    modalRef: RefObject<HTMLDivElement>;
    modalPos: ModalPositionType;
    modalSize: ModalSizeType;
    setModalPos: (pos: ModalPositionType) => void;
    setModalSize: (size: ModalSizeType) => void;
    setAction: (action: ActionType) => void;
    setRightBottomEdge: (pos: ModalPositionType) => void;
    onClose: () => void;
    children?: null | ReactElement;
    header?: null | ReactElement;
    customStyles?: {
        content?: CSSProperties;
        header?: CSSProperties;
        body?: CSSProperties;
    }
}) => {
    const handleModalOnLoad = useCallback((event: SyntheticEvent<HTMLDivElement>) => {
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
    }, [modalPos, setModalPos, setModalSize]);

    const handleOnMouseDown = useCallback((event: MouseEvent<HTMLDivElement>, actionType: ActionType) => {
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
    }, [modalRef, modalPos, setAction, setRightBottomEdge]);

    return (
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
            <ModalHeader
                handleOnMouseDown={handleOnMouseDown}
                onClose={onClose}
                header={header}
                headerCustomStyles={customStyles?.header}
            />

            <ModalBody
                handleOnMouseDown={handleOnMouseDown}
                children={children}
                bodyCustomStyles={customStyles?.body}
            />

            <ModalBottomEdge
                handleOnMouseDown={handleOnMouseDown}
            />
        </div>
    )
}

export default ModalContent;

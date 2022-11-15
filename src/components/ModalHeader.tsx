import React, {
    MouseEvent,
    useCallback,
    ReactElement,
    CSSProperties,
} from 'react';
import { ActionType } from '../types';
import CloseButton from './CloseButton';

const ModalHeader = ({
    handleOnMouseDown,
    onClose,
    header,
    headerCustomStyles,
} : {
    handleOnMouseDown: (event: MouseEvent<HTMLDivElement>, action: ActionType) => void;
    onClose: () => void;
    header?: null | ReactElement;
    headerCustomStyles?: CSSProperties;
}) => {
    const handleOnMouseDownToMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'Move');
    }, [handleOnMouseDown]);

    const handleOnMouseDownToResizeNW = useCallback((event: MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeNW');
    }, [handleOnMouseDown]);

    const handleOnMouseDownToResizeNorth = useCallback((event: MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeNorth');
    }, [handleOnMouseDown]);

    const handleOnMouseDownToResizeNE = useCallback((event: MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeNE');
    }, [handleOnMouseDown]);

    return (
        <div
            className="modal-header"
            style={headerCustomStyles}
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
    );
}

export default ModalHeader;

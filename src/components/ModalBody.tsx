import React, {
    MouseEvent,
    useCallback,
    ReactElement,
    CSSProperties,
} from 'react';
import { ActionType } from '../types';

const ModalBody = ({
    handleOnMouseDown,
    children,
    bodyCustomStyles,
} : {
    handleOnMouseDown: (event: MouseEvent<HTMLDivElement>, action: ActionType) => void;
    children?: null | ReactElement;
    bodyCustomStyles?: CSSProperties;
}) => {
    const handleOnMouseDownToResizeWest = useCallback((event: MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeWest');
    }, [handleOnMouseDown]);

    const handleOnMouseDownToResizeEast = useCallback((event: MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeEast');
    }, [handleOnMouseDown]);

    return (
        <div
            className="modal-body row"
            style={bodyCustomStyles}
        >
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
    )
}

export default ModalBody;

import React, {
    MouseEvent,
    useCallback,
} from 'react';
import { ActionType } from '../types';

const ModalBottomEdge = ({
    handleOnMouseDown,
} : {
    handleOnMouseDown: (event: MouseEvent<HTMLDivElement>, action: ActionType) => void;
}) => {
    const handleOnMouseDownToResizeSW = useCallback((event: MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeSW');
    }, [handleOnMouseDown]);

    const handleOnMouseDownToResizeSouth = useCallback((event: MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeSouth');
    }, [handleOnMouseDown]);

    const handleOnMouseDownToResizeSE = useCallback((event: MouseEvent<HTMLDivElement>) => {
        handleOnMouseDown(event, 'ResizeSE');
    }, [handleOnMouseDown]);

    return (
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
    )
}

export default ModalBottomEdge;

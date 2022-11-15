export type ModalSizeType = {
    width: string | number;
    height: string | number;
}

export type ModalPositionType = {
    x: number;
    y: number;
}

export type ActionType = 'Move' | 'ResizeNorth' | 'ResizeNW' | 'ResizeNE' 
    | 'ResizeWest' | 'ResizeEast' | 'ResizeSW' 
    | 'ResizeSouth' | 'ResizeSE' | null;
import React, { useState, useRef } from 'react';
import Tile from './Tile';

import ChessMoveValidator from '../../utils/chessMovesUtil';

import styles from './chessui.module.css'

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
    image: string;
    x: number;
    y: number;
}

const initialBoardState: Piece[] = [];

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "/pawn_b.png", x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "/pawn_w.png", x: i, y: 1 });
}


for (let p = 0; p < 2; p++) {
    const type = p === 0 ? "b" : "w";
    const y = p === 0 ? 7 : 0;
  
    initialBoardState.push({ image: `/rook_${type}.png`, x: 0, y });
    initialBoardState.push({ image: `/rook_${type}.png`, x: 7, y });
    initialBoardState.push({ image: `/knight_${type}.png`, x: 1, y });
    initialBoardState.push({ image: `/knight_${type}.png`, x: 6, y });
    initialBoardState.push({ image: `/bishop_${type}.png`, x: 2, y });
    initialBoardState.push({ image: `/bishop_${type}.png`, x: 5, y });
    initialBoardState.push({ image: `/queen_${type}.png`, x: 3, y });
    initialBoardState.push({ image: `/king_${type}.png`, x: 4, y });
}


export default function ChessUiComp() {

    const moveVaildator = new ChessMoveValidator();
    const chessBoardRef = useRef<HTMLDivElement>(null);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

    // console.log({pieces});

    const handlePieceDrag = (e: React.DragEvent, pieceImage: string, x: number, y: number) => {
        const element = e.target as HTMLElement

        element.classList.add('hideByTransition');
        e.dataTransfer.setData("pieceInitialData", `${pieceImage}:${x}:${y}`);
    }

    const handleOnDropPiece = (e: React.DragEvent) => {
        const currentPiecesState = pieces;
        const chessBoardCurr = chessBoardRef.current;
        if(chessBoardCurr) {
            const dropX = Math.floor((e.clientX - chessBoardCurr?.offsetLeft) / 100);
            const dropY = Math.abs(Math.ceil((e.clientY - chessBoardCurr?.offsetTop - 800) / 100));   

            const pieceInitialData = e.dataTransfer.getData("pieceInitialData");
            const pieceInitialDataSplit = pieceInitialData.split(":");
            const pieceType = pieceInitialDataSplit[0];
            const initial_X = Number(pieceInitialDataSplit[1]);
            const initial_Y = Number(pieceInitialDataSplit[2]);

            console.log({dropX, dropY, initial_X, initial_Y, pieceType});

            // Todo: Validation check for some basic moves
            const validMove = moveVaildator.isValidMove(dropX, dropY, initial_X, initial_Y, pieceType, currentPiecesState);

            console.log({validMove})

            if(!validMove) {
                alert('Not a Valid Move, Try again...');
                return;
            }


            setPieces((prevState) => {

                const newState = [...prevState.filter((prevPiece) => {
                    return !(initial_X === prevPiece.x && initial_Y === prevPiece.y)
                }), {x: dropX, y: dropY, image: pieceType}]

                return newState;
            })
        }
    }

    const handleDragOverPiece = (e: React.DragEvent) => {
        e.preventDefault();
    }

    let boards = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for(let i = 0; i < horizontalAxis.length; i++) {

            const number = j + i ;
            let image = '';

            pieces.forEach((piece) => {
                if(piece.x === i && piece.y === j){
                    image = piece.image;
                }
            })

            boards.push(
                <Tile 
                    onDragPiece={(e, pieceImage, x, y) => handlePieceDrag(e, pieceImage, x, y)} 
                    key={`V:${j}H:${i}`} 
                    number={number} 
                    image={image}
                    x={i}
                    y={j}
                />
            )
        }
    }
    

  return (
    <div ref={chessBoardRef} onDrop={handleOnDropPiece} onDragOver={handleDragOverPiece} className={styles['chessui-container']}>{boards}</div>
  )
}


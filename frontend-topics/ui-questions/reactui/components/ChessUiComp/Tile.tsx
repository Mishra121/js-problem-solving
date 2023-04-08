/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './chessui.module.css'

interface Props {
    image?: string;
    number: number;
    x: number;
    y: number;
    onDragPiece: (e: React.DragEvent, image: string, x: number, y: number) => void
}

export default function Tile({image, number, onDragPiece, x, y}: Props) {

    const handlePieceDragEnd = (e: React.DragEvent) => {
        let element = e.target as HTMLElement;
        setTimeout(() => {
            element.classList.remove('hideByTransition');
        }, 0);
    }

    if(number % 2 === 0) 
        return <div className={`${styles.tile} ${styles.tile__green}`} id={`x:${x}y:${y}`} >
                    {image && <div draggable 
                                    onDragStart={(e) => onDragPiece(e, image, x, y)}
                                    onDragEnd={handlePieceDragEnd}
                                    style={{backgroundImage: `url(${image})`}} 
                                    className={styles.tile__piece}   
                                >
                            </div>
                    }
                    {`x:${x}y:${y}`}
                </div>
    return <div className={`${styles.tile} ${styles.tile__white}`} id={`x:${x}y:${y}`}>
                {image && <div draggable 
                                onDragStart={(e) => onDragPiece(e, image, x, y)}
                                onDragEnd={handlePieceDragEnd}
                                style={{backgroundImage: `url(${image})`}} 
                                className={styles.tile__piece}
                            >
                        </div>
                }
                {`x:${x}y:${y}`}
            </div>
}

import React, { useState, useEffect } from 'react';
import styles from './tttstyle.module.css';


const horizontalWinIndexCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

const verticalWinIndexCombos = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
]

const diagonalWinIndexCombos = [
  [1, 5, 9],
  [3, 5, 7]
]

function Box({value, id}: any) {
  return(
  <div className={styles.ttt_box} id={id}>
    {value}
  </div>
  )
}

const initialBoard: any[] | (() => any[]) = [];
for(let i = 1; i <= 9; i++) {
  initialBoard.push({i, val: ""});
}

export default function TicTacToeComp() {

  const [boardState, setBoardState] = useState(initialBoard);
  const [currentUser, setCurrentUser] = useState('X');

  useEffect(()=> {

    // Check winner logic
    horizontalWinIndexCombos.forEach((combo) => {
      if(boardState[combo[0] - 1].val !== "" && (boardState[combo[0] - 1].val === boardState[combo[1] - 1].val && boardState[combo[1] - 1].val === boardState[combo[2] - 1].val)) {
        alert('Game Over... ' + boardState[combo[0] - 1].val + "! won")
        setBoardState(initialBoard);
        setCurrentUser('X')
      }
    })

    verticalWinIndexCombos.forEach((combo) => {
      if(boardState[combo[0] - 1].val !== "" && (boardState[combo[0] - 1].val === boardState[combo[1] - 1].val && boardState[combo[1] - 1].val === boardState[combo[2] - 1].val)) {
        alert('Game Over... ' + boardState[combo[0] - 1].val + "! won")
        setBoardState(initialBoard);
        setCurrentUser('X')
      }
    })

    diagonalWinIndexCombos.forEach((combo) => {
      if(boardState[combo[0] - 1].val !== "" && (boardState[combo[0] - 1].val === boardState[combo[1] - 1].val && boardState[combo[1] - 1].val === boardState[combo[2] - 1].val)) {
        alert('Game Over... ' + boardState[combo[0] - 1].val + "! won")
        setBoardState(initialBoard);
        setCurrentUser('X')
      }
    })

    // Check Draw Logic
    let emptyBox = boardState.some((boxItem) => boxItem.val === '');
    if(!emptyBox) {
      alert('Game Over... It was a bloody draw')
      setBoardState(initialBoard);
      setCurrentUser('X')
    }

  }, [boardState]);

  const handleGridClick = (e: React.MouseEvent<HTMLElement>) => {
    let target =  e.target as HTMLElement;
    let [, location_i] = target.id.split("-");
    // console.log({target: location_i})

    setBoardState((prevBoardState) => {
      const newState =  prevBoardState.map((boxItem) => {
        if(boxItem.val === "" && boxItem.i === Number(location_i)) {
          return {...boxItem, val: currentUser}
        } else {
          return boxItem;
        }
      })
      // console.log({newState})
      return newState;
    })

    setCurrentUser((prevUser) => (prevUser === 'X') ? 'O' : 'X');
  }

  return (
    <div className={styles.container}>
      <h2 style={{marginTop: "140px", marginBottom: "120px"}}>Tic-Tac-Toe</h2>

      <div className={styles.ttt_grid} onClick={handleGridClick}>
        {
          boardState.map((boxItem) => (
            <Box key={boxItem.i} value={boxItem.val} id={`box-${boxItem.i}`} />
          ))
        }
      </div>
    </div>
  )
}

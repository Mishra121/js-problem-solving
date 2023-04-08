import { Piece } from "../components/ChessUiComp/ChessUiComp";

export const PAWN = 'pawn';
export const BISHOP = 'bishop';
export const WHITE = 'white';
export const BLACK = 'black';
export default class ChessMoveValidator {
    isValidMove(dropX: number, dropY: number, initial_X: number, initial_Y: number, pieceType: string, piecesState: Piece[]) {

      const team = (pieceType.includes('_w')) ? WHITE : BLACK;
      let index_ = pieceType.indexOf('_');
      const type = pieceType.slice(1, index_);

      console.log("Validate the move");
      console.log(`Initial location: (${initial_X},${initial_Y})`);
      console.log(`Drop/Current location: (${dropX},${dropY})`);
      console.log(`Team: ${team}, Piece Type: ${type}`);
      console.log('PState: ', piecesState);

      const checkTileEmpty = () => {
        let emptyStatus = true;

        piecesState.forEach((piece) => {
            if(piece.x === dropX && piece.y === dropY) {
                emptyStatus = false;
            }
        })
        return emptyStatus;
      }

      if(type === PAWN) {        

        if(team === WHITE) {
            if(initial_Y === 1) {
                if(dropX === initial_X && (dropY - initial_Y === 1 || dropY - initial_Y === 2)) {
                  return checkTileEmpty();
                }
            }
            else {
                if(dropX === initial_X && dropY - initial_Y === 1) {
                    return checkTileEmpty();
                }
            }
        }
        if(team === BLACK) {
            if(initial_Y === 6) {
                if(dropX === initial_X && (initial_Y - dropY === 1 || initial_Y - dropY === 2)) {
                    return checkTileEmpty();
                }
            }
            else {
                if(dropX === initial_X && (initial_Y - dropY === 1)) {
                    return checkTileEmpty();
                }
            }
        }
      }


      // Bishop basic logics
      if (type === BISHOP) {

        let pieceInPath = false;

        if(dropX > initial_X && dropY < initial_X) {
            for(let i = initial_X + 1; i<=dropX; i++) {
                for(let j = initial_Y - 1; j >= dropY; j--) {

                    if(Math.abs(i - initial_Y) !== Math.abs(j - initial_X)) {
                        continue;
                    } 

                    if(piecesState.some((piece) => piece.x === i && piece.y === j)) {
    
                        console.log("Some piece in path....")
                        pieceInPath =  true;
                    } 
                }
            }
        } 
        
        if(dropX < initial_X && dropY > initial_Y) {
            for(let j = initial_Y + 1; j<= dropY; j++) {
                for(let i = initial_X - 1; i >= dropX; i--) {

                    if(Math.abs(i - initial_Y) !== Math.abs(j - initial_X)) {
                        continue;
                    } 

                    if(piecesState.some((piece) => piece.x === i && piece.y === j)) {
    
                        console.log("Some piece in path....")
                        pieceInPath =  true;
                    } 
                }
            }
        }

        if(dropX < initial_X && dropY < initial_Y) {
            for(let i = initial_X - 1; i>=dropX; i--) {
                for(let j = initial_Y - 1; j >= dropY; j--) {


                    if(Math.abs(i - initial_Y) !== Math.abs(j - initial_X)) {
                        continue;
                    } 

                    console.log("Case working....", {i, j})


                    if(piecesState.some((piece) => piece.x === i && piece.y === j)) {
    
                        console.log("Some piece in path....")
                        pieceInPath =  true;
                    } 
                }
            }
        }

        if(dropX > initial_X && dropY > initial_Y) {
            let i=initial_X + 1, j=initial_Y + 1;
            while (i <= dropX && j <= dropY) {
                console.log('checking...', {i, j})

                if(piecesState.some((piece) => piece.x === i && piece.y === j)) {

                    console.log("Some piece in path....")
                    pieceInPath =  true;
                } 

                i++;
                j++;
            }
        }
        

        if(Math.abs(dropY - initial_Y) === Math.abs(dropX - initial_X)) {
            return !(pieceInPath)
        }
       }
  

        //   if(!(dropX===0 && dropY===0)) return true;  
      return false;
    }
  }
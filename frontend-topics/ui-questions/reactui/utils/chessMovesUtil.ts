export default class ChessMoveValidator {
    isValidMove(dropX: number, dropY: number, initial_X: number, initial_Y: number, pieceType: string) {
      console.log("check the move");
      console.log(`Initial location: (${initial_X},${initial_Y})`);
      console.log(`Drop/Current location: (${dropX},${dropY})`);
      console.log(`Piece type: ${pieceType}`);

      const teamType = (pieceType.includes('_w')) ? "white" : "black";

      console.log(`Team: ${teamType}`);
  
    //   if (type === PieceType.PAWN) {
    //     if (team === TeamType.OUR) {
    //       if (py === 1) {
    //         if (px === x && (y - py === 1 || y - py === 2)) {
    //           return true;
    //         }
    //       } else {
    //           if(px === x && y - py === 1) {
    //               return true;
    //           }
    //       }
    //     }
    //   }

      if(!(dropX===0 && dropY===0)) return true;
  
      return false;
    }
  }
import ChessUiComp from "../../components/ChessUiComp/ChessUiComp";
import styles from '../../components/ChessUiComp/chessui.module.css'

export default function chessui() {
  return (
    <div className={styles.chessapp}><ChessUiComp/></div>
  )
}

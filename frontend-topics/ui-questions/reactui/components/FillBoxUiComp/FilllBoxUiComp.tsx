import { useState, useEffect } from 'react'

import styles from './fillbox.module.css'

const xCordinate = [0, 1, 2];
const yCordinate = [0, 1, 2];

let order = 0;

export interface Box {
    i: number;
    j: number;
    isClicked: boolean;
    order: number;
}

const getBoxesStateInitial = () => {
    let boxesData: Box[] = [];

    xCordinate.map((i) => {
        return yCordinate.map((j) => {
            if(!(i===1 && j > 0)) {
                boxesData.push({ i, j, isClicked: false, order: 0 });
            }
        })
    })

    return boxesData
}

export default function FilllBoxUiComp() {

    const [boxState, setBoxState] = useState<Box[]>(getBoxesStateInitial())

    // console.log({boxState});
    useEffect(() => {
        let AllClicked = false;

        if(!(boxState.some((box) => !box.isClicked))) {
            AllClicked = true;
        }

        if(AllClicked) {
            boxState.forEach((_, index) => {
                return setTimeout(() => {
                  let tempBox = [...boxState];
                  tempBox[index].isClicked = false;
                  setBoxState(tempBox);
                }, 500 * (index + 1));
            });
        }
    }, [boxState])

    const changeColor = (i: number, j: number) => {
        let temp = [...boxState];
        const selectedBox = temp.find((item) => item.i === i && item.j === j);
        if(selectedBox) {
            selectedBox.isClicked = true;
            selectedBox.order = ++order;
        }
        temp.sort((a, b) => (a.order > b.order ? 1 : -1));
        setBoxState(temp);
    }


    const getBoxesUi = () => {
        const boxes = xCordinate.map((i) => {
            return yCordinate.map((j) => {
                if(!(i === 1 && j > 0)) {
                    return (
                        <div
                            key={`${i}${j}`}
                            className={styles.box}
                            onClick={() => changeColor(i, j)}
                            style={{
                                backgroundColor: boxState?.find(
                                (item) => item.i === i && item.j === j
                                )?.isClicked
                                ? "green"
                                : "white",
                            }}
                        >
                            {/* {`${i}${j}`} */}
                        </div>
                    )
                }
                return <div key={`${i}${j}`}></div>
            })
        }) 

        return boxes;
    }

  return (
    <div className={styles.app__container}>
        <div className={styles.box__container}>{getBoxesUi()}</div>
    </div>
  )
}

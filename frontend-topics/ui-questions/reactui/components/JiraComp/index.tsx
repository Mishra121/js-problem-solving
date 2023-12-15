import React, { useState } from "react";
import styles from "./jira.module.css";

const boards = [
  { name: "Todo", value: "T" },
  { name: "Inprogress", value: "I" },
  { name: "Done", value: "D" },
];
const tasks = [
  {
    task_name: "task1",
    status: "D",
  },
  {
    task_name: "task2",
    status: "I",
  },
  {
    task_name: "task3",
    status: "T",
  },
  {
    task_name: "task4x",
    status: "T",
  },
];

export default function JiraComp() {
  const [boardState, setBoardState] = useState(boards);
  const [taskState, setTaskState] = useState(tasks);
  const [clickedTask, setClickedTask] = useState<string>("");

  console.log({clickedTask})

  const handleTaskClick = (task_name: string)  => {
    console.log('click...', {task_name})
    setClickedTask(task_name);
  }

  const handleBoardTaskClick = (board_name: string) => {
    if(clickedTask === "") {
        console.log('vela aadmi task to click karle', board_name);
        return;
    }

    const taskToMoveDetails = taskState?.find((taskObj) => taskObj.task_name === clickedTask);
    const boardClickedDetails = boardState?.find((boardObj) => boardObj.name === board_name);

    if(taskToMoveDetails?.status === boardClickedDetails?.value) {
        console.log('already in same board position...', board_name);
        return;
    } 

    setTaskState((prevTaskState) => {
        const newState = prevTaskState.map((taskItem) => {
            if(taskItem.task_name === taskToMoveDetails?.task_name && boardClickedDetails?.value) {
                return {...taskItem, status: boardClickedDetails?.value}
            } else {
                return taskItem;
            }
        })

        console.log({newState});

        return newState;
    })

    setClickedTask("");
  }


  return (
    <div className={styles.container}>
      {boardState.map((boardObject) => (
        <div onClick={() => handleBoardTaskClick(boardObject.name)} key={boardObject.name} className={styles.boardstyle}>
          <h3 style={{marginBottom: "20px"}}>{boardObject.name}</h3>
          {taskState.map(
            (taskObj, index) =>
              taskObj.status === boardObject.value && (
                <div onClick={(e) => handleTaskClick(taskObj.task_name)} className={styles.taskstyle} key={`${taskObj}-${index}`}>{taskObj.task_name}</div>
              )
          )}
        </div>
      ))}
    </div>
  );
}

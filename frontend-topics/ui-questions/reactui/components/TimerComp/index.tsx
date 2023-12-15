import { useEffect, useState, useRef } from "react"

export default function TimerComp() {

    const [count, setCount] = useState<number>(0);
    // const [intervalKey, setIntervalKey] = useState<NodeJS.Timer>();
    const timerRef = useRef<any>();
    // const timerInitiatedRef = useRef<boolean>();
    // const timerCountRef = useRef<number>();

    
    useEffect(() => {
        var myInterval = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000)

        // setIntervalKey(myInterval);
        timerRef.current = myInterval;

        console.log('UseEffect Ran.... Key: ', myInterval);

        return () => {
            clearInterval(myInterval);
            console.log('Return UseEffect Ran... Demount');
        };
    }, [count])

    // useEffect(() => {
    //     setInterval(() => {
    //         timerCountRef.current = timerCountRef.current
    //     }, 1000)
    // }, []);

    const pauseTimer = () => {
        clearInterval(timerRef.current);
    }

    const resumeTimer = () => {
        
        setTimeout(() => {
            setCount(count + 1);
        }, 1000)
    }

    const resetTimer = () => {
        // clearInterval(intervalKey);
        setCount(0);
    }

  return (
    <div>
        <h3>TimerComp</h3>
        <p>Time Counter value: {count}</p>

        <button onClick={pauseTimer}>
            Kardo pause
        </button>

        <button onClick={resumeTimer}>resume karoo</button>

        <button onClick={resetTimer}>reset karo</button>
    </div>
  )
}

import React, {useState, useEffect} from "react"
import GameLogic from "./CustomHooks/useGameLogic.js"

/**
 * Challenge:
 * 
 * 1. Create state to hold the current value of the countdown timer.
 *    Display this time in the "Time Remaining" header
 * 
 * 2. Set up an effect that runs every time the `timeRemaining` changes
 *    The effect should wait 1 second, then decrement the `timeRemaining` by 1
 * 
 *    Hint: use `setTimeout` instead of `setInterval`. This will help you avoid
 *    a lot of extra work.
 * 
 *    Warning: there will be a bug in this, but we'll tackle that next
 * 
 * 3. Make it so the effect won't run if the time is already at 0
 */

function App() {
   
    let {reference,handleChange,text,running,time,start,wordsCount}=GameLogic();
   
    
    
    console.log("render")
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea
            ref={reference}
                onChange={handleChange}
                value={text}
                disabled={!running}
            />
            <h4>Time remaining: {time}</h4>
            <button onClick={start} disabled={running} >Start</button>
            <h1>Word count: {wordsCount}</h1>
        </div>
    )
}

export default App

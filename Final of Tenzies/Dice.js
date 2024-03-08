import React from "react"

export default function(props){
    
    let styleDice={backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF" }
    return (
       
        <div className="dice" style={styleDice} onClick={props.holdDice} >
         
           <h1 className="dice-num">
                {props.value}
            </h1>
        </div>
    )
}
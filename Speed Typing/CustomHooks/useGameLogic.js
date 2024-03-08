import React, {useState, useEffect} from "react"

function GameLogic(){
    
    
     const [text, setText] = useState("")
    const [time, setTime] = useState(3)
    const [running,setRunning]=React.useState(false);
    const [wordsCount,setWordsCount]=React.useState(0);
    let reference=React.useRef(null);
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    function start(){
        setRunning(pre=>!pre)       //Differnt from answer
        setTime(3);
        setText(" ")
        reference.current.focus();
        // setTime(pre=>pre-1);
    }
    
    function countWords(text){
        let count=0;
        if(text==" "){
            return 0
        }
        
        for(let i=0;i<text.length;i++){
            if(text[i]===" "){
                count++;
            }
        }
        return count
    }
     useEffect(() => {
        // if(time===0 || !running){
        //     console.log("not run")
        // }
        // else{
            if(time>0 && running){  //run timer
        setTimeout(() => {
            setTime(pre=>(pre-1))
        }, 1000)
        }
        else{
            setWordsCount(countWords(text.trim()+" "));
            setRunning(false)
            
            
        }
    }, [time,running])
    
    return {reference,handleChange,text,running,time,start,running,wordsCount}
}

export default GameLogic
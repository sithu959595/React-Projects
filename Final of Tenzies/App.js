import React from "react"
import Dice from "./Dice.js"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function(){
        
    function allNewDice(){
        
        let newDiceValue=[];
        for(let i=0;i<10;i++){
            const value={value: Math.floor(Math.random() * 6), isHeld: false, id:nanoid()}
            newDiceValue.push(value);
        }
        
        return newDiceValue;
    }
    
    let record=JSON.parse(localStorage.getItem("record"));
    console.log("the record is "+record)
    const [tenzies,setTenzies]=React.useState(false);
   let [count,setCount]=React.useState(0);
     const [newDiceValue,setNewDiceValue]=React.useState(allNewDice());
    
    // newDiceValue.map((num)=>{
    //     return <Dice className="dice1 dice" value={num}/>
    // }
    // )
    
     function holdDice(id){
        //  console.log(id)
        setNewDiceValue(
            (pre)=>(
                pre.map(
                    // (cur)=>{ return {...cur, isHeld:id==cur.id ? true : false }}. this one gave a bug
                    // (cur)=>{ return id===cur.id ? {...cur, isHeld: !cur.isHeld } : cur } give syntex error although it is right
                    (cur)=>{ 
                        if(id===cur.id){
                            cur.isHeld=!cur.isHeld;
                        }
                        return cur;
                        }
                )
            )
        );
       
    }
    function rollDice(){
        setCount(pre=>(pre+1));
        if(tenzies){
            // location.reload();
            if(record>count || record==null){
            localStorage.setItem("record",JSON.stringify(count));
            }
            else{
                console.log(count+ " is not smaller than "+record)
            }
            setCount(0);
            setTenzies(false);
            setNewDiceValue(allNewDice);
        }
        else{
        setNewDiceValue(pre=>{
            let neww=allNewDice();
            return pre.map(
                (cur,index)=>{
                    if(!cur.isHeld){
                        cur.value=neww[index].value;
                    }
                    return cur;
                    
                    // return cur.isHeld ? cur : {...cur,value: neww[index].value} spread operator is giving syntax error although it is right
                }
            )       //end of map
        });
        }
    }
    let showDice=newDiceValue.map((num)=>(
        <Dice className="dice1 dice" value={num["value"]} id={num.id} key={num.id} isHeld={num.isHeld} holdDice={()=>holdDice(num.id)}/>))
    
    React.useEffect(()=>{
        let val=7;
        for(let i=0;i<newDiceValue.length;i++){
            if(newDiceValue[i].isHeld){
                if(val===7){
                    val=newDiceValue[i].value;
                }
                if(newDiceValue[i].value!==val){
                    console.log(newDiceValue[i].value+" is not "+ val)
                    return
                }
            }
            else{
                console.log("not all hold")
                return
            }
        }
        setTenzies(true);
        console.log("Won");
    },[newDiceValue]);
    
    
    return(
        <main>
       
        <h2 className="game-title">Tenzies</h2>
        <div className="explain">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</div>
        <div className="record" >{record} </div>
        <div className="dice-container">
            {showDice }
        </div>
        <button className="roll" onClick={rollDice} >{tenzies ? "New Game" : "Roll"}</button>
        {count}
        
        {tenzies ? <Confetti /> : "" }
         
    </main>)
}
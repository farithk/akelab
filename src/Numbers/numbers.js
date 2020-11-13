import React, { useState, useEffect } from "react";
import axios from 'axios';
import search from '../images/search.png';
import filter from '../images/filterIcon.png';
import arrow from '../images/arrow.png';
import "../styles/fibonacci.css"

const Numbers = () => {

    const [number, setNumber] = useState();

    const [serie, setSerie] = useState([1]);

    function fibonacci() 
    { 
        let serieIn = [];
        for(let i = 1; i <= number; i++){
            if (i % 3 === 0 && i % 5 !== 0){
                serieIn.push("AKE");
            }
        
            else if (i % 3 !== 0 && i % 5 === 0){
                serieIn.push("LAB");
            }
          
            else if (i % 3 === 0 && i % 5 === 0){
                serieIn.push("AKELAB");
            } else{
                serieIn.push(i);
            }
            
            console.warn(serieIn);
            setSerie(serieIn);
        }
        
     
    } 

      const handleInput = (e) =>{
          if (e.target.value != ""){
            setNumber(parseInt(e.target.value))
          } else {
            setNumber((""))
          }
          
      }

      useEffect(() => {
          setSerie([1])
         
      }, [])
     
  return (
    <div>

        <div className="fibonacciTitle">Type the qty of numbers for the Numbers Serie</div>
        <div>
            <input className="inputFibo" type="text" placeholder="1" value={number} onChange={handleInput} />
            <div className="buttonGenerate" onClick={fibonacci}>Generate</div>
        </div>

        <div className="fiboNumbersContainer">
        {serie ? 
        
        serie.map((genre, key) => (
            <div className="fiboNumbers" key={key}>
                <div>{genre}</div>
            </div>
        ))

    :""}
        </div>
      
    </div>
  );
};

export default Numbers;
